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

// COMPLETELY REPLACE your old /api/profile/:userId route with this one.

app.get("/api/profile/:userId", async (req, res) => {
  console.log("\n--- SINGLE USER PROFILE REQUEST RECEIVED ---");

  try {
    // Log the entire params object from the request
    console.log("1. Request params object:", req.params);

    const { userId } = req.params;
    
    // Log the ID we extracted
    console.log("2. Extracted userId:", userId);
    console.log("3. Type of userId:", typeof userId);

    // Check if the ID is even valid before querying
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("4. VALIDATION FAILED: The ID is not a valid MongoDB ObjectId format.");
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    console.log("4. VALIDATION PASSED: The ID format is correct.");

    console.log("5. Now querying the database with findById...");
    const user = await User.findById(userId);

    // This is the most important log. What did the database return?
    console.log("6. Database query result:", user);

    if (!user) {
      console.log("7. CONCLUSION: User not found in database for this ID.");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("7. CONCLUSION: User found successfully!");
    res.json(user);
    
  } catch (error) {
    console.error("!!! An unexpected error occurred in the route handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.put("/api/profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        
        const updates = req.body;
        
        delete updates.industry;
        delete updates.gstNumber;
        delete updates.panNumber;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ error: "Error updating profile" });
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