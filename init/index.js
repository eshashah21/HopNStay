const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js"); // this gives you { data: [...] }

main().then(() => {
    console.log("connected to DB");
    seedDB();
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/HopNStay");
}

async function seedDB() {
    try {
        await Listing.deleteMany({});
        console.log("Old listings deleted");

        const formattedData = initData.data.map((listing) => ({
            ...listing,
            image: listing.image.url, // Flatten image object to just the URL string
            owner: "68358553b30816cb189ec143" // Add fixed owner ID
        }));

        await Listing.insertMany(formattedData);
        console.log("Data inserted successfully");
    } catch (err) {
        console.error("Error seeding database:", err);
    }
}
