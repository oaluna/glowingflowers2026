import React, { useContext } from "react";
import { AppContext } from "../AppContext";

const Cart: React.FC = () => {
  const context = useContext(AppContext);

  // TypeScript safety check
  if (!context) {
    throw new Error("Cart must be used within an AppProvider");
  }

  const { cart } = context;

  // Calculate the total price using the array 'reduce' method
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h2 className="text-3xl font-bold text-pink-400 mb-6 border-b border-gray-700 pb-4">
        Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-lg mb-4">
            Your cart is currently empty.
          </p>
          <a
            href="/"
            className="text-pink-400 hover:text-pink-300 underline font-semibold"
          >
            Browse our catalog to find something beautiful!
          </a>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          {/* Cart Items List */}
          <ul className="divide-y divide-gray-700">
            {cart.map((item, index) => (
              <li
                key={index}
                className="p-4 flex justify-between items-center hover:bg-gray-750 transition-colors"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400">Item #{item.id}</p>
                </div>
                <div className="text-xl font-bold text-gray-200">
                  ${item.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Summary & Checkout */}
          <div className="bg-gray-900 p-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-white">
              Total:{" "}
              <span className="text-pink-400">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>

            <button className="w-full sm:w-auto px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg shadow-lg transition-colors focus:ring-4 focus:ring-pink-500/50 focus:outline-none">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
