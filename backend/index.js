const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const { User, Listing, Review } = require("./db/db.js");

mongoose
  .connect(process.env.DB_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.get("/api/discover", async (req, res) => {
  try {
    const listings = await Listing.find().populate("owner", "name email");
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching listings" });
  }
});

app.get("/api/my-listings/:userId", async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.params.userId }).populate("owner", "name email");
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user listings" });
  }
});

app.post("/api/listings", async (req, res) => {
  try {
    const { title, description, category, location, status, image, owner } = req.body;
    const newListing = await Listing.create({ title, description, category, location, status, image, owner });
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ error: "Error creating listing" });
  }
});

app.get("/api/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const { rating, text, company, reviewer, verified } = req.body;
    const newReview = await Review.create({ rating, text, company, reviewer, verified });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Error creating review" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));