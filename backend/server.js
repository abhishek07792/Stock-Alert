const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const YahooFinance = require("yahoo-finance2").default; 
const Stock = require("./models/Stock");
const sendEmail = require("./utils/mailer");
const checkAuth = require('./middleware/checkAuth')
const loginController = require("./controllers/login")

dotenv.config();

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// Routes
const stockRoutes = require("./routes/stocks");
const User = require("./models/User");
app.use("/api/stocks", checkAuth,stockRoutes);
app.use("/login",loginController);

// Background stock checker
const CHECK_INTERVAL = 5000; // 5 sec

// setInterval(async () => {
//   const stocks = await Stock.find();
//   for (const stock of stocks) {
//     try {
//       const quote = await yahooFinance.quote(stock.symbol);
//       const price = quote?.regularMarketPrice;
      
//       for (const userId of stock.users) {
//         const user = await User.findById(userId);
//         if (price >= stock.threshold && !stock.alertSent) {
//           await sendEmail(
//             `🚨 ${stock.symbol} hit ₹${price}`,
//             `The stock ${stock.symbol} reached your threshold ₹${stock.threshold}`,
//             user.email
//           );
//           stock.alertSent = true;
//           await stock.save();
//         }
//       }
//     } catch (err) {
//       console.error("Error checking stock:", err.message);
//     }
//   }
// }, CHECK_INTERVAL);

async function checkStocks() {
  const stocks = await Stock.find();
  for (const stock of stocks) {
    try {
      const quote = await yahooFinance.quote(stock.symbol);
      const price = quote?.regularMarketPrice;

      for (const userId of stock.users) {
        const user = await User.findById(userId);
        if (price >= stock.threshold && !stock.alertSent) {
          await sendEmail(
            `🚨 ${stock.symbol} hit ₹${price}`,
            `The stock ${stock.symbol} reached your threshold ₹${stock.threshold}`,
            user.email
          );
          stock.alertSent = true;
          await stock.save();
        }
      }
    } catch (err) {
      console.error("Error checking stock:", err.message);
    }
  }
}

app.get("/api/run-check", async (req, res) => {
  await checkStocks();
  res.send("Stock check done");
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
