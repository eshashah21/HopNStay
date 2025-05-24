const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const listing = require("../models/listing.js");
const { listingSchema, reviewSchema } = require("../schema.js"); // to get listing data [demo data]

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//new route (form)
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id).populate("reviews");

    if(!foundListing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing: foundListing });
}));

//create route (submit form)
router.post("/", validateListing, wrapAsync(async (req, res, next) => {

    // let {title, description, image, price, location, country} = req.body;
    const newListing = new listing(req.body.listing);

    if (!newListing.description) {
        throw new ExpressError(400, "description is missing");
    }

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}));

//edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id);

    if(!foundListing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    
    res.render("listings/edit.ejs", { listing: foundListing });
}));

//update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
}));

//destroy route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}));

module.exports = router;