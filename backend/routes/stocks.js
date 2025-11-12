const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const stockController = require("../controllers/stock");
router.get("/",checkAuth, stockController.getAllStocks);
router.get("/price/:symbol", stockController.getStockPrice);


router.post("/", checkAuth,stockController.createStock);

router.delete("/:id",checkAuth,stockController.deleteStock);

module.exports = router;
