import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppProvider, AppContext } from "./AppContext";

// Import all of our built components
import Catalog from "./components/Catalog";
import CustomOrder from "./components/CustomOrder";
import EventBooking from "./components/EventBooking";
import Cart from "./components/Cart";
import Login from "./components/Login";

// 1. We create a Navigation component so it can securely access our Context
const Navigation: React.FC = () => {
  const context = useContext(AppContext);

  // TypeScript safety check
  if (!context) return null;

  const { user, logout, cart } = context;
  const cartItemCount = cart.length;

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 hover:opacity-80 transition-opacity"
        >
          Glowing Flowers
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-6 text-sm font-semibold text-gray-300">
          <Link to="/" className="hover:text-pink-400 transition-colors">
            Catalog
          </Link>
          <Link to="/custom" className="hover:text-pink-400 transition-colors">
            Custom Orders
          </Link>
          <Link to="/events" className="hover:text-pink-400 transition-colors">
            Book an Event
          </Link>

          <Link
            to="/cart"
            className="hover:text-pink-400 transition-colors flex items-center gap-2"
          >
            Cart
            {/* Show a pink notification bubble if there are items in the cart */}
            {cartItemCount > 0 && (
              <span className="bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full shadow-lg">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Dynamic Login / Logout Toggle */}
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded hover:border-pink-500 hover:text-pink-400 transition-all"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-500 transition-colors shadow-lg shadow-pink-500/20"
            >
              Login / Sign Up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

// 2. The Main App Component
const App: React.FC = () => {
  return (
    <AppProvider>
      {/* We wrap the entire app in the Router so links work everywhere */}
      <Router>
        {/* min-h-screen ensures the background stretches all the way down, even if the page is empty */}
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
          {/* The Navigation we built above */}
          <Navigation />

          {/* Main Content Area - flex-grow pushes the footer to the bottom */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/custom" element={<CustomOrder />} />
              <Route path="/events" element={<EventBooking />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          {/* A simple, clean footer to finish the page structure */}
          <footer className="bg-black border-t border-gray-800 text-center py-6 mt-12 text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Glowing Flowers. All rights
              reserved.
            </p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
