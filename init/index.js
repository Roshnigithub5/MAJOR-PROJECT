const mongoose = require("mongoose");

const initData = require("./data2.js");

const Listing = require("../models/listing.js");

main()
    .then((res)=>{
        console.log("connection to DB..");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner : "664b298d4ef5f305d82a94ad"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized..");
};

initDB();