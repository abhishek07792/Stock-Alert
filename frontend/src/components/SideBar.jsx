import { Link } from "react-router-dom";
import "../styles/layout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <h1 style={{ color: "var(--accent-blue)", fontSize: "1.5rem", fontWeight: "600" }}>
          📊 StockAlert
        </h1>
        <nav style={{ marginTop: "24px" }}>
          <Link to="/dashboard" className="nav-link">Dashboard</Link><br />
          <Link to="/add" className="nav-link">Add Stock</Link>
        </nav>
      </div>
      <footer className="footer">© 2025 StockAlert</footer>
    </aside>
  );
}
