const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const {Listing} = require('./db/db.js')
mongoose    
  .connect(process.env.DB_connection)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.get("/api/discover", async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: "Error fetching listings" });
  }
});

app.get('/api/complaint',async (req,res)=>{
    res.send({message : "this is complaint page"})
})
app.get('/api/dashboard',async (req,res)=>{
    res.send({message : "this is dashboard page"})
})
app.get('/api/register',async (req,res)=>{
    res.send({message : "this is register page"})
})

// Start server
app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);
