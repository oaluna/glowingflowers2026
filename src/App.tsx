import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Catalog from "./components/Catalog";
import EventBooking from "./components/EventBooking";
import Cart from "./components/Cart";
import CustomOrder from "./components/CustomOrder";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <header>
          <h1>Glowing Flowers</h1>
          <nav className="flex flex-row items-center justify-evenly">
            <Link className="text-pink-300 hover:text-green-300 text-sm" to="/">
              Catalog
            </Link>
            <Link
              className="text-pink-300 hover:text-green-300 text-sm"
              to="/custom"
            >
              Custom Orders
            </Link>
            <Link
              className="text-pink-300 hover:text-green-300 text-sm"
              to="/events"
            >
              Book an Event
            </Link>
            <Link
              className="text-pink-300 hover:text-green-300 text-sm"
              to="/cart"
            >
              My Shopping Cart
            </Link>
            <Link
              className="text-pink-300 hover:text-green-300 text-sm"
              to="/login"
            >
              Login / Sign Up
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/custom" element={<CustomOrder />} />
            <Route path="/events" element={<EventBooking />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </AppProvider>
  );
};

export default App;
