const express = require("express");
const router = express.Router();

const ExpressError = require("../utils/ExpressError.js");

const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

//index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//new route (form)
router.get("/new", isLoggedIn, (req, res) => {
    // console.log(req.user);
    res.render("listings/new.ejs");
});

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const foundListing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");

    if (!foundListing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    
    console.log(foundListing);
    res.render("listings/show.ejs", { listing: foundListing });
}));

//create route (submit form)
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    // let {title, description, image, price, location, country} = req.body;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (!newListing.description) {
        throw new ExpressError(400, "description is missing");
    }

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const foundListing = await Listing.findById(id);

    if (!foundListing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing: foundListing });
}));

//update route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
}));

//destroy route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}));

module.exports = router;