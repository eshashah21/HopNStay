const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://dummyimage.com/600x400/cccccc/000000&text=No+Image",
        set: (v) => v === "" ? "https://dummyimage.com/600x400/cccccc/000000&text=No+Image" : v
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
