// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/HopNStay";

// main().then(() => {
//     console.log("connected to DB");
// }).catch(err => {
//     console.log(err);
// })

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     await listing.deleteMany({});
//     await listing.insertMany(initData.data);
//     console.log("data was initialized");
// };

// initDB();

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
            image: listing.image.url // Flatten image object to just the URL string
        }));

        await Listing.insertMany(formattedData);
        console.log("Data inserted successfully");
    } catch (err) {
        console.error("Error seeding database:", err);
    }
}
