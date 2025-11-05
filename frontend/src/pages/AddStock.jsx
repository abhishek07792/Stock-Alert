import { useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import "./Page.css";

export default function AddStock() {
  const [symbol, setSymbol] = useState("");
  const [threshold, setThreshold] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/api/stocks", { symbol, threshold });
    alert("Stock added successfully!");
    setSymbol("");
    setThreshold("");
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <h2>Add Stock</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>Stock Symbol</label>
          <input value={symbol} onChange={(e) => setSymbol(e.target.value)} required />

          <label>Threshold Price (₹)</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary">Add Stock</button>
        </form>
      </main>
    </div>
  );
}
