import { useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from 'react-router-dom';
import "./Page.css";

export default function AddStock() {
  const [symbol, setSymbol] = useState("");
  const [threshold, setThreshold] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPrice = async () => {
    try {
      setError("");
      setLoading(true);
      setCurrentPrice(null);

      const res = await API.get(`/api/stocks/price/${symbol}`);
      const price = res.data.price;
      setCurrentPrice(price);
    } catch (err) {
      setError("❌ Unable to fetch stock price. Please check symbol name.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!threshold) return alert("Please select or enter a threshold first.");

    await API.post("/api/stocks", { symbol, threshold });
    alert("✅ Stock alert added successfully!");
    setSymbol("");
    setThreshold("");
    setCurrentPrice(null);
    navigate('/dashboard');
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <h2>Add Stock Alert</h2>

        <form className="form" onSubmit={handleSubmit}>
          <label>Stock Symbol</label>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="e.g. ADANIENT"
            required
          />

          <button
            type="button"
            className="btn btn-secondary"
            onClick={fetchPrice}
            disabled={!symbol || loading}
          >
            {loading ? "Fetching..." : "Search Price"}
          </button>

          {error && <p className="error">{error}</p>}

          {currentPrice && (
            <div className="price-section">
              <p className="current-price">
                Current Price: <strong>₹{currentPrice}</strong>
              </p>
              <p>Select Alert Threshold:</p>
              <div className="threshold-options">
                <button
                  type="button"
                  className={`option-btn ${
                    threshold === (currentPrice + 5).toFixed(2) ? "active" : ""
                  }`}
                  onClick={() => setThreshold((currentPrice + 5).toFixed(2))}
                >
                  ₹{(currentPrice + 5).toFixed(2)} (+5)
                </button>
                <button
                  type="button"
                  className={`option-btn ${
                    threshold === (currentPrice + 10).toFixed(2) ? "active" : ""
                  }`}
                  onClick={() => setThreshold((currentPrice + 10).toFixed(2))}
                >
                  ₹{(currentPrice + 10).toFixed(2)} (+10)
                </button>
              </div>

              <div className="custom-threshold">
                <label>Or Enter Custom Price:</label>
                <input
                  type="number"
                  value={threshold}
                  placeholder="Enter custom alert price"
                  onChange={(e) => setThreshold(e.target.value)}
                />
              </div>
            </div>
          )}

          {threshold && (
            <div className="selected-threshold">
              <p>
                Selected Threshold: <strong>₹{threshold}</strong>
              </p>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!threshold}
          >
            Add Stock
          </button>
        </form>
      </main>
    </div>
  );
}
