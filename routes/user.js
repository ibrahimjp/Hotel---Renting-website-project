const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapasync = require("../utils/wrapasync");
const passport = require("passport");
const userController = require("../controllers/user");

// Render the signup form// Handle signup submission
router
  .route("/signup")
  .get((req, res) => {
    res.render("listings/users/signup.ejs"); // Path relative to 'views'
  })
  .post(wrapasync(userController.signUp));


// Render the login form// Handle login submission
  router.route("/login").get((req, res) => {
    res.render("listings/users/login.ejs");
  }).post(
    passport.authenticate("local", {
      failureRedirect: "/login", // Redirect to login on failure
      failureFlash: true, // Show error message
    }),
    async (req, res) => {
      req.flash("success", "Welcome Back To WanderLust");
      let redirectUrl = req.session.redirectUrl || "/listings";
      delete req.session.redirectUrl; // Clear the redirect URL after use
      res.redirect(redirectUrl);
    }
  );

// Handle logout
router.get("/logout", userController.logout);

module.exports = router;
