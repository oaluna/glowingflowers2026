import React, { useContext } from "react";
import { AppContext, Arrangement } from "../AppContext";

// Dummy data for your arrangements
const arrangements: Arrangement[] = [
  {
    id: 1,
    name: "Spring Sunshine",
    price: 45.0,
    desc: "Bright yellow and orange blooms radiating warmth and joy.",
  },
  {
    id: 2,
    name: "Midnight Romance",
    price: 65.0,
    desc: "Deep red roses with dark accents and lush greenery.",
  },
  {
    id: 3,
    name: "Pastel Dream",
    price: 50.0,
    desc: "Soft pinks, purples, and whites perfect for a gentle touch.",
  },
  {
    id: 4,
    name: "Neon Orchid",
    price: 55.0,
    desc: "Vibrant exotic orchids that practically glow in the dark.",
  },
];

const Catalog: React.FC = () => {
  const context = useContext(AppContext);

  // TypeScript safety check
  if (!context) {
    throw new Error("Catalog must be used within an AppProvider");
  }

  const { addToCart } = context;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Our Arrangements
        </h2>
        <p className="text-gray-400 mt-3">
          Handcrafted with love. Ready to brighten your day.
        </p>
      </div>

      {/* Tailwind Grid: 1 column on mobile, 2 on tablets, 3 on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {arrangements.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col shadow-lg hover:shadow-pink-500/20 hover:border-pink-500 transition-all duration-300"
          >
            {/* Optional: You can add an <img> tag here later for flower pictures */}
            <div className="h-40 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-gray-500">
              [Image Placeholder]
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>

            {/* flex-grow ensures the button is always pushed to the bottom if descriptions vary in length */}
            <p className="text-gray-400 text-sm flex-grow mb-6">{item.desc}</p>

            <div className="flex justify-between items-center mt-auto border-t border-gray-700 pt-4">
              <span className="text-2xl font-bold text-pink-300">
                ${item.price.toFixed(2)}
              </span>

              <button
                onClick={() => addToCart(item)}
                className="px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-lg shadow-md transition-colors focus:ring-4 focus:ring-pink-500/50 focus:outline-none"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
