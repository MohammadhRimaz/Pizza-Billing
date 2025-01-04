import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ItemManagement from "./components/ItemManagement";
import InvoiceManagement from "./components/InvoiceManagement";

function App() {
  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <Link className="navbar-brand" to="/">
          Pizza Billing
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/items">
            Item Management
          </Link>
          <Link className="nav-link" to="/invoices">
            Invoice Management
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/items" element={<ItemManagement />} />
        <Route path="/invoices" element={<InvoiceManagement />} />
      </Routes>
    </div>
  );
}

export default App;
