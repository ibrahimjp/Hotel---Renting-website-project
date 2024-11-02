const mongoose=require("mongoose");
const listing = require("../models/listing");
const initData=require("./data.js")

main().then((res) => {
    console.log("Conected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB= async () => {
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("Data Inserted");
}

initDB();