const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");

//post reviews route
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let foundListing = await Listing.findById(req.params.id);
    let newRev = new Review(req.body.review);
    newRev.author = req.user._id;
    foundListing.reviews.push(newRev);

    await newRev.save();
    await foundListing.save();

    req.flash("success", "New Review Created");
    res.redirect(`/listings/${foundListing._id}`);
}));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;