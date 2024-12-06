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
    initData.data=initData.data.map((obj) => ({...obj,owner:"67414f7fcac9b6b1c06ed733"}))
    await listing.insertMany(initData.data);
    console.log("Data Inserted");
}

initDB();