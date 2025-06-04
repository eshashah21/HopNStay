const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js");
require("dotenv").config(); // For MAP_TOKEN

const mapToken = process.env.MAP_TOKEN;
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


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

        const formattedData = [];

        for (let listing of initData.data) {
            const geoData = await geocodingClient
                .forwardGeocode({
                    query: `${listing.location}, ${listing.country}`,
                    limit: 1
                })
                .send();

            const coordinates = geoData.body.features[0]?.geometry?.coordinates;

            if (!coordinates) {
                console.warn(`No coordinates found for: ${listing.location}, skipping`);
                continue;
            }

            formattedData.push({
                ...listing,
                owner: "6836be196831b0774190c963", // Your fixed owner ID
                geometry: {
                    type: "Point",
                    coordinates: coordinates
                }
            });
        }

        await Listing.insertMany(formattedData);
        console.log("Data inserted successfully");
    } catch (err) {
        console.error("Error seeding database:", err);
    }
}
