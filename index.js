const express=require("express");
const app =express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

main().then((res) => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
app.set("view engine","ejs");
app.engine("ejs",ejsMate);
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

//index Route
app.get("/listings" , async (req,res) => {
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});


//New route 
app.get("/listings/new",(req,res) => {
    res.render("listings/new.ejs");
})

//show Route
app.get("/listings/:id",async (req,res) => {
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create Route
app.post("/listings",async (req,res) => {
    // let {title , description ,image , price , coutry , location }=req.body;
    // let listing=req.body.listing;
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req,res) => {
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

// Update Route
app.put("/listings/:id" ,async (req,res) => {
    let {id} =req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

//DElete Route

app.delete("/listings/:id",async(req,res) => {
    let{id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
     console.log(deleted);
     res.redirect("/listings");
});

// app.get("/testlisting", async (req,res) => {
//     let newListing=new listing({
//         title:"My villa",
//         decription:"I am the best in my feild",
        
//         price:100000,
//         location:"Near dubai",
//         country:"Dubai"
//     });
//  await newListing.save();
//  console.log("db inserted");
//  res.send("Successfull testing");


// });



app.get("/",(req,res) => {
    res.send("working route");
});


app.listen(8080,()=>{
    console.log("Listening to port 8080");
});