const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image: {
        type: {
            filename: { type: String, default: "listingimage" },
            url: { type: String, default: "https://wallpapercave.com/wp/wp4141009.jpg" }
        },
        default: { filename: "listingimage", url: "https://wallpapercave.com/wp/wp4141009.jpg" }
    },
    price:Number,
    location:String,
    country:String,
});


const listing=mongoose.model("Listing",listingSchema);
module.exports=listing;