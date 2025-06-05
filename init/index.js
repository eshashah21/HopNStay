const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data.js");
require("dotenv").config(); // For MAP_TOKEN

const mapToken = process.env.MAP_TOKEN;
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
    seedDB();
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

async function seedDB() {
    try {
        await Listing.deleteMany({});
        console.log("Old listings deleted");

        const formattedData = [];

        for (let listing of initData.data) {
            const geoData = await geocodingClient
                .forwardGeocode({
                    query: listing.location,
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
                owner: "684123df4d510387968bfba2", // Your fixed owner ID
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
