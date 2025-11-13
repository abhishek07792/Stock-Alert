import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import Sidebar from "../components/Sidebar";
import "./Page.css";

export default function Dashboard() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => { fetchStocks(); }, []);

  const fetchStocks = async () => {
    const { data } = await API.get("/api/stocks");
    setStocks(data);
  };

  const deleteStock = async (id) => {
    if (!window.confirm("Delete this stock?")) return;
    await API.delete(`/api/stocks/${id}`);
    setStocks(stocks.filter(s => s._id !== id));
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <header className="page-header">
          <h2>My Watchlist</h2>
          <Link to="/add" className="btn btn-primary">+ Add Stock</Link>
        </header>

        <div className="card-grid">
          {stocks.length === 0 ? (
            <p className="empty">No stocks added yet.</p>
          ) : (
            stocks.map(stock => (
              <div key={stock._id} className={`card ${stock.alertSent ? "alert" : ""}`}>
                <h3>{stock.symbol}</h3>
                <p>Threshold: ₹{stock.threshold}</p>
                <p>
                  {stock.alertSent ? (
                    <span className="status alert">🚨 Alert Sent</span>
                  ) : (
                    <span className="status active">🟢 Active</span>
                  )}
                </p>
                <button className="btn btn-danger" onClick={() => deleteStock(stock._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
