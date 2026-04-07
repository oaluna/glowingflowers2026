import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppProvider, AppContext } from "./AppContext";
import { FiShoppingBag, FiUser, FiLogOut } from "react-icons/fi";
import AdminPanel from "./components/AdminPanel";
import Catalog from "./components/Catalog";
import CustomOrder from "./components/CustomOrder";
import EventBooking from "./components/EventBooking";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Background from "./assets/background.png";
import Logo from "./assets/logo.png"

const Navigation: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { user, logout, cart } = context;
  const cartItemCount = cart.length;

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link
          to="/"
          className="text-md font-bold text-brandEarth tracking-wide hover:opacity-80 transition-opacity"
        >
          <img src={Logo} alt="glowing-flowers" className="w-64"/>
        </Link>

        <nav className="flex flex-wrap justify-between items-center gap-8 font-sans text-xs tracking-widest uppercase text-brandEarth/80 font-semibold">
          <div className="flex justify-start items-center gap-8 col-8">
            <Link to="/" className="hover:text-brandRose transition-colors">
              Catalog
            </Link>
            <Link
              to="/custom"
              className="hover:text-brandRose transition-colors"
            >
              Custom
            </Link>
            <Link
              to="/events"
              className="hover:text-brandRose transition-colors"
            >
              Events
            </Link>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {" "}
            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2 border border-stone-300 rounded-full hover:border-brandRose hover:text-brandRose transition-all"
              >
                {/* Added the Logout Icon here! */}
                <FiLogOut className="text-sm" />
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2 bg-brandEarth text-white rounded-full hover:bg-brandRose transition-colors"
              >
                {/* Added the User Icon here! */}
                <FiUser className="text-sm" />
                Login
              </Link>
            )}{" "}
            <Link
              to="/cart"
              className="hover:text-brandRose transition-colors flex items-center justify-end gap-2 relative"
            >
              {/* Added the Shopping Bag Icon here! */}
              <FiShoppingBag className="text-lg" />

              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-brandRose text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        {/* The background is now our soft brandCream */}
        <div className="min-h-screen bg-brandCream text-brandEarth flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <img
              src={Background}
              alt="background"
              className="w-screen h-screen fixed scroll-none object-cover opacity-30"
            />
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/custom" element={<CustomOrder />} />
              <Route path="/events" element={<EventBooking />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>

          {/* A sophisticated, minimalist footer */}
          <footer className="bg-white border-t border-stone-200 text-center py-10 mt-12 text-brandEarth/60 font-sans text-xs tracking-widest uppercase">
            <p>
              &copy; {new Date().getFullYear()} Glowing Flowers. Elegantly
              Crafted.
            </p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
