const express = require("express");
const app = express();

const mongoose = require("mongoose");

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const listing = require("./models/listing.js");
const {listingSchema} = require("./schema.js");

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/HopNStay";

main().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.end("hello");
});

const validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

//index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//new route (form)
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id);
    res.render("listings/show.ejs", { listing: foundListing });
}));

//create route (submit form)
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
        
    // let {title, description, image, price, location, country} = req.body;
    const newListing = new listing(req.body.listing);

    if(!newListing.description){
        throw new ExpressError(400, "description is missing");
    }

    await newListing.save();
    res.redirect("/listings");

}));

//edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id);
    res.render("listings/edit.ejs", { listing: foundListing });
}));

//update route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//destroy route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// app.get("/testListning", async (req, res) => {
//     let sampleListing = new listing({
//         title: "My Home",
//         description: "Welcome",
//         price: 1200,
//         location: "Mumbai",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page not found!"));
// });

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    // res.render("error.ejs", {err});
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
});


app.listen(8080, () => {
    console.log("server is litening");
});