
const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Warehouse Space', 'Transport Fleet', 'Raw Material Procurement', 'Storage Unit']
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Under Discussion', 'Booked'],
    default: 'Available'
  },
  image: {
    type: String,
    default: null
  },
  openDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Listing = mongoose.model("Listing", ListingSchema, "listings");

module.exports = {
  Listing
};
