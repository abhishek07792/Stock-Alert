const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  threshold: { type: Number, required: true },
  alertSent: { type: Boolean, default: false },
  users :[{ type:mongoose.Schema.Types.ObjectId, ref:"User"}]
});

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
 