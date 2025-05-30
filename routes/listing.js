const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

router.route("/")
    //index route
    .get(wrapAsync(listingController.index))
    //create route (submit form)
    .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//new route (form)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    //show route
    .get(wrapAsync(listingController.showListing))
    //update route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    //destroy route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;