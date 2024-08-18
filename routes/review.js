const express = require("express");
const router = express.Router({mergeParams :true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const session = require("express-session");
const { validateReview, isLoggedIn, isAuthor} = require("../views/middleware.js");
const reviewController = require("../controllers/reviews.js");
    //Post Route
   router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

    //Delete Review route
   router.delete("/:reviewId",isLoggedIn, isAuthor,  wrapAsync(reviewController.destroyReview));

    module.exports = router;