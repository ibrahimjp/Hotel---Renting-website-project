const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapasync");
const ExpressError = require("../utils/expressError");
const { reviewSchema } = require("../schema");
const Listing = require("../models/listing");
const { validateReview, isLoggenIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/review");

// Reviews Route
router.post(
  "/",
  isLoggenIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggenIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
