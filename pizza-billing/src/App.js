import "./App.css";
import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ItemManagement from "./components/ItemManagement";
import InvoiceManagement from "./components/InvoiceManagement";
import heroImage from "./image/hero_image.png";

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <Link className="navbar-brand" to="/">
          PIZZA BILLING
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

      {/* Conditionally render the hero image only on the homepage */}
      {isHomePage && (
        <div className="hero-image-container mb-4">
          <p>
            Welcome to the world of pizza perfection, where every slice is a
            story of love, tradition, and flavor. Pizza isn’t just food – it’s a
            universal language that brings people together. From its humble
            origins in Italy to becoming a global sensation, pizza has captured
            the hearts of millions with its endless combinations of crusts,
            sauces, and toppings. Whether you crave a classic Margherita with
            its rich tomato base and fresh basil or a bold barbecue chicken with
            smoky flavors, pizza offers something for every palate. It's the
            ultimate comfort food – ideal for family gatherings, late-night
            cravings, or casual get-togethers with friends. We take pride in
            every detail, from sourcing the freshest ingredients to crafting the
            perfect dough that’s crisp on the outside yet soft on the inside.
            Paired with gooey cheese and your favorite toppings, each bite
            promises an unforgettable experience. Dive into our world of freshly
            baked pizzas, where passion meets perfection. Your next favorite
            slice is just around the corner – grab it, savor it, and let the
            magic of pizza make your day extraordinary!
          </p>
          <img src={heroImage} alt="pizza" className="hero-image" />
        </div>
      )}

      <Routes>
        <Route path="/items" element={<ItemManagement />} />
        <Route path="/invoices" element={<InvoiceManagement />} />
      </Routes>
    </div>
  );
}

export default App;
