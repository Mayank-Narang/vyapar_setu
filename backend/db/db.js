const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model("Item", ItemSchema, "test1");

module.exports = {
    Item,
}