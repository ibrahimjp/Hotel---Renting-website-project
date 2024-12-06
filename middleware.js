const Listing=require("./models/listing");
const { listingSchema ,reviewSchema} = require("./schema");
const ExpressError = require("./utils/expressError");
const Review = require("./models/review");


module.exports.isLoggenIn= (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","To move furthur you have to log in")
       return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirect = (req, res, next) => {
    if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
      delete req.session.redirectUrl; // Clear the redirect URL after saving it
    }
    next();
  };
  
  module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const listing = await Listing.findById(id);
      
      if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
      }
  
      if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that");
        return res.redirect(`/listings/${id}`);
      }
  
      next();
    } catch (err) {
      next(err);
    }
  };
  
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
      const errmess = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errmess);
    }
    next();
  };

  module.exports.validateReview = (req, res, next) => {
      const { error } = reviewSchema.validate(req.body);
      if (error) {
          const errmess = error.details.map((el) => el.message).join(",");
          throw new ExpressError(400, errmess);
      }
      next();
  };
  module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
  
    try {
      const review = await Review.findById(reviewId);
  
      if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
      }
  
      if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this review");
        return res.redirect(`/listings/${id}`);
      }
  
      next();
    } catch (err) {
      next(err);
    }
  };
  