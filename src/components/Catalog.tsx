import React, { useContext } from "react";
import { AppContext, Arrangement } from "../AppContext";
import { FiPlus } from "react-icons/fi";

// We've updated our data to include the beautiful stock images!
const arrangements: Arrangement[] = [
  {
    id: 1,
    name: "Spring Sunshine",
    price: 45.0,
    desc: "Bright yellow and orange blooms radiating warmth and joy.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqhFGTPw11k-lkqfyhPF9Ck89Yrd6M4GXCF5NF2GLn-AWDnkBZS-DPmbbpkmx",
  },
  {
    id: 2,
    name: "Midnight Romance",
    price: 65.0,
    desc: "Deep red roses with dark accents and lush greenery.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM1Q1RkDCnThKiOOxr0Xrkstsftn7TvocHcWfk2wVcRH-NojgPvOpafhRjWiiP",
  },
  {
    id: 3,
    name: "Pastel Dream",
    price: 50.0,
    desc: "Soft pinks, purples, and whites perfect for a gentle touch.",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQwRk5icLJqsH_x6LnW6nhWRwuQVX_1lNXksy0VyusWG5D9AMcV5THIJ2_o1Nlx",
  },
  {
    id: 4,
    name: "Neon Orchid",
    price: 55.0,
    desc: "Vibrant exotic orchids that command attention.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWDrQbRf_QKv4xCcHe96CFb28E7bySDTNmXrghws20RG8Tm6tEL9jQBm3RCqlB",
  },
];

const Catalog: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Catalog must be used within an AppProvider");
  }

  const { addToCart } = context;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 mb-20">
      <div className="text-center mb-16 opacity-0 animate-fade-in-up">
        <h2 className="text-5xl font-normal text-brandEarth tracking-wide mb-4">
          Our Arrangements
        </h2>
        <div className="w-16 h-0.5 bg-brandRose mx-auto mb-6"></div>
        <p className="text-brandEarth/70 text-lg italic">
          Handcrafted with love. Rooted in nature.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {arrangements.map((item, index) => (
          <div
            key={item.id}
            style={{ animationDelay: `${index * 150}ms` }}
            className="bg-white rounded-2xl p-8 flex flex-col shadow-sm border border-stone-100 opacity-0 animate-fade-in-up hover:-translate-y-2 hover:shadow-xl hover:shadow-brandRose/10 transition-all duration-500 ease-in-out"
          >
            {/* The new image implementation! */}
            <div className="h-56 w-full mb-6 rounded-xl overflow-hidden bg-stone-50">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <h3 className="text-2xl font-bold text-brandEarth mb-3">
              {item.name}
            </h3>

            <p className="text-brandEarth/80 font-sans text-sm leading-relaxed flex-grow mb-8">
              {item.desc}
            </p>

            <div className="flex justify-between items-center mt-auto border-t border-stone-100 pt-6">
              <span className="text-2xl font-semibold text-brandSage">
                ${item.price.toFixed(2)}
              </span>

              <button
                onClick={() => addToCart(item)}
                className="flex items-center gap-2 px-6 py-2.5 bg-brandRose hover:bg-brandEarth text-white font-sans text-sm tracking-widest uppercase rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brandRose focus:ring-offset-2"
              >
                <FiPlus className="text-lg" />
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
