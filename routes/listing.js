const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync");
const { isLoggenIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listing.js");
const { storage } = require("../cloudconfig.js"); // Import storage from cloudinary.js
const multer = require("multer");
const upload = multer({ storage }); // Pass the CloudinaryStorage object to Multer

//INdex and update route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggenIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route
router.get("/new", isLoggenIn, listingController.renderForm);


// Edit Route
router.get(
    "/:id/edit",
    isLoggenIn,
    wrapAsync(listingController.renderEditForm)
  );


// Update Route// Delete Route// Show Route
router
  .route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put(
    isLoggenIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggenIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );


module.exports = router;
