import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { FiLock, FiCreditCard } from "react-icons/fi";

const Checkout: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) throw new Error("Checkout must be used within an AppProvider");

  const { cart, clearCart } = context;

  // Form state for payment details (simulated)
  const [paymentData, setPaymentData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price, 0);
  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // Simulating an 8% tax rate
  const total = subtotal + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this is where you would connect to Stripe or PayPal!
    alert(
      `Payment successful! Thank you for your order, ${paymentData.nameOnCard}.`
    );

    // Empty the cart and send them back to the home page
    clearCart();
    navigate("/");
  };

  // Reusing our elegant styling
  const inputStyles =
    "w-full p-3 mt-2 bg-transparent text-brandEarth border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRose focus:border-transparent transition-all font-sans tracking-wide";
  const labelStyles =
    "text-xs font-bold font-sans uppercase tracking-widest text-brandEarth/70 block mt-5";

  // If they somehow get here with an empty cart, redirect them
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-12 mb-20 text-center animate-fade-in-up">
        <h2 className="text-3xl text-brandEarth mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="text-brandRose hover:text-brandEarth font-sans text-sm tracking-widest uppercase transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 mb-20 animate-fade-in-up">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FiLock className="text-3xl text-brandEarth" />
          <h2 className="text-4xl text-brandEarth">Secure Checkout</h2>
        </div>
        <div className="w-12 h-0.5 bg-brandSage mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Order Summary */}
        <div className="bg-brandCream/50 p-8 rounded-2xl border border-stone-200">
          <h3 className="text-xl font-bold text-brandEarth mb-6 border-b border-stone-200 pb-4">
            Order Summary
          </h3>

          <ul className="divide-y divide-stone-200 mb-6">
            {cart.map((item, index) => (
              <li
                key={index}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  {/* Miniature thumbnail of the arrangement */}
                  <img
                    src={item.category}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md border border-stone-200"
                  />
                  <div>
                    <h4 className="font-semibold text-brandEarth">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs text-brandEarth/60 uppercase tracking-widest">
                      Qty: 1
                    </p>
                  </div>
                </div>
                <div className="font-semibold text-brandSage">
                  ${item.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-3 font-sans text-sm tracking-wide text-brandEarth/80 border-t border-stone-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-brandEarth pt-3 border-t border-stone-200 mt-3">
              <span>Total</span>
              <span className="text-brandRose">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Details */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
          <h3 className="flex items-center gap-2 text-xl font-bold text-brandEarth mb-6 border-b border-stone-100 pb-4">
            <FiCreditCard className="text-brandRose" />
            Payment Information
          </h3>

          <form onSubmit={handleSubmit}>
            <label className={labelStyles}>
              Name on Card
              <input
                type="text"
                name="nameOnCard"
                value={paymentData.nameOnCard}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                className={inputStyles}
              />
            </label>

            <label className={labelStyles}>
              Card Number
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                required
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className={inputStyles}
              />
            </label>

            <div className="flex gap-6">
              <label className={`${labelStyles} flex-1`}>
                Expiration Date
                <input
                  type="text"
                  name="expiry"
                  value={paymentData.expiry}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  className={inputStyles}
                />
              </label>

              <label className={`${labelStyles} flex-1`}>
                Security Code (CVC)
                <input
                  type="text"
                  name="cvc"
                  value={paymentData.cvc}
                  onChange={handleChange}
                  required
                  placeholder="123"
                  maxLength={4}
                  className={inputStyles}
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-10 w-full py-4 bg-brandEarth text-white font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-brandRose transition-colors shadow-md"
            >
              Pay ${total.toFixed(2)}
            </button>
            <p className="text-center font-sans text-xs text-brandEarth/50 mt-4 tracking-wide">
              Transactions are securely encrypted.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
