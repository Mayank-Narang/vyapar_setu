const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb+srv://unextgenfome:OdiAzxeXW34h9LTt@cluster0.7dy31kv.mongodb.net/test1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model("Item", ItemSchema, "test1");

app.get("/api/discover", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
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
