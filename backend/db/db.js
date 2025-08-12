const mongoose = require("mongoose");

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
    enum: ["Warehouse Space", "Transport Fleet", "Raw Material Procurement"]
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Under Discussion", "Booked"],
    default: "Available"
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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema, "listings");
const User = mongoose.model("User", UserSchema, "users");
const Review = mongoose.model("Review", ReviewSchema, "reviews");

module.exports = { Listing, User, Review };