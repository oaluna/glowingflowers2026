import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiArrowLeft } from "react-icons/fi"; // Added Trash and Arrow icons
import { useCart } from "@/context/CartContext";

const Cart: React.FC = () => {
  const { items, removeFromCart, totalPrice } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-12 mb-20 animate-fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl text-brandEarth mb-4">Your Cart</h2>
        <div className="w-12 h-0.5 bg-brandSage mx-auto"></div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-stone-100">
          <p className="text-brandEarth/60 text-lg mb-6 italic">
            Your botanical basket is empty.
          </p>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 font-sans text-sm font-semibold tracking-widest uppercase text-brandRose hover:text-brandEarth transition-colors"
          >
            <FiArrowLeft />
            Return to Catalog
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <ul className="divide-y divide-stone-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="p-6 flex justify-between items-center hover:bg-brandCream/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-stone-100"
                  />
                  <div>
                    <h3 className="text-xl w-48 h-24 font-semibold text-brandEarth">
                      {item.name}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-widest text-brandEarth/50">
                      Item #{item.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-lg font-semibold text-brandSage">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </div>

                  {/* The Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-stone-300 hover:text-brandRose transition-colors duration-300"
                    title="Remove item"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6">
            <div className="bg-brandCream/30 p-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-xl text-brandEarth">
                Total:{" "}
                <span className="font-bold text-brandRose ml-2">
                ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            <br />
            <Link to="/checkout" className="w-full sm:w-auto">
              <button className="sm:w-auto py-3 bg-brandEarth hover:bg-brandRose text-white font-sans text-sm font-semibold tracking-widest uppercase rounded-full shadow-md transition-colors duration-300">
                Checkout securely
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
