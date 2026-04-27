import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/catalog" },
    { name: "Booking", href: "/event-booking" },
    { name: "Build", href: "/custom-order" },
    { name: "Custom Order", href: "/custom-order" },
    { name: "Sign In", href: "/login" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-blush-100/90 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl text-espresso tracking-tight"
          >
            <img
              src={logo}
              className="w-64 h-auto object-contain bg-transparent"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-sans text-sm text-espresso/80 hover:text-coral transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-espresso/80 hover:text-coral transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-espresso/80 hover:text-coral transition-colors duration-300 relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-espresso/80 hover:text-coral transition-colors duration-300"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-espresso/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-80 bg-blush-100 shadow-xl transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-10">
              <span className="font-serif text-xl text-espresso">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-espresso/80 hover:text-coral transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-lg text-espresso hover:text-coral transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
