const YahooFinance = require("yahoo-finance2").default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const Stock = require("../models/Stock");
exports.getAllStocks =  async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
};

exports.getStockPrice = async (req, res) => {
  try {
    let { symbol } = req.params;
    symbol = symbol.toUpperCase() + ".NS";
    const quote = await yahooFinance.quote(symbol);
    const price = quote?.regularMarketPrice;
    if (!price) return res.status(404).json({ error: "Price not found" });

    res.json({ price });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stock price" });
  }
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