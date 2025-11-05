const Stock = require("../models/Stock");
exports.getAllStocks =  async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
};

exports.createStock =  async (req, res) => {
  const id = req.userData.id;
  const { threshold } = req.body;
  const symbol = req.body.symbol +".NS";
  const stock = new Stock({ symbol, threshold , users:[id]});
  await stock.save();
  res.status(201).json(stock);
}

exports.deleteStock =  async (req, res) => {
  await Stock.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};