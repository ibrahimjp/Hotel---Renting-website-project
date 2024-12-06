const Review=require("../models/review");
const Listing=require("../models/listing");
const User=require("../models/user");

module.exports.signUp=async (req, res,next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err) => {
        req.flash("success", "Welcome To WanderLust");
        res.redirect("/listings");  
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


  module.exports.renderSignUpForm = (req, res) => {
    res.render("listings/users/signup.ejs"); // Separate template for signup
  };
  

  module.exports.logout = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You logged out successfully!");
      res.redirect("/listings");
    });
  };
  
  
