const express = require("express");
const router = express.Router({ mergeParams: true });

const review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//post reviews route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let foundListing = await listing.findById(req.params.id);
    let newRev = new review(req.body.review);

    foundListing.reviews.push(newRev);

    await newRev.save();
    await foundListing.save();

    req.flash("success", "New Review Created");
    res.redirect(`/listings/${foundListing._id}`);
}));

//delete review route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;