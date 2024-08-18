const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn , isOwner, validateListing} = require("../views/middleware.js");
const bodyParser = require("body-parser");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js");

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing ));

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); 

    //Edit route
    router.get("/:id/edit", isLoggedIn, isOwner,  wrapAsync(listingController.renderEditForm));

    //search route
    //router.get("/search", isLoggedIn, wrapAsync())

    module.exports = router;