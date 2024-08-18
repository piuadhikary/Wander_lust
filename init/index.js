const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
//const MONGO_URL = "mongodb://127.0.0.1:27017/Wonderlust";
const dbUrl = process.env.ATLASDB_URL;
main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "66a119f9601fad21248c16f5" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();