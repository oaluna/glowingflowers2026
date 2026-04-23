import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { ref, get } from "firebase/database";
import { rtdb } from "../firebase";
import { FiPlus } from "react-icons/fi";

import type { Product } from "../AppContext";

const Catalog: React.FC = () => {
  const context = useContext(AppContext);
  const [arrangements, setArrangements] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  if (!context) throw new Error("Catalog must be used within an AppProvider");
  const { addToCart } = context;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(rtdb, "products");
        const snapshot = await get(productsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const productsList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          })) as Product[];

          setArrangements(productsList);
        } else {
          console.log("No arrangements found in database.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-brandEarth/60 italic">
        Loading beautiful arrangements...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12 mb-20">
      <div className="text-center mb-16 opacity-0 animate-fade-in-up">
        <h2 className="text-5xl font-normal text-brandEarth tracking-wide mb-4">
          Our Arrangements
        </h2>
        <div className="w-16 h-0.5 bg-brandRose mx-auto mb-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {arrangements.map((item, index) => (
          <div
            key={item.id}
            style={{ animationDelay: `${index * 150}ms` }}
            className="bg-white rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-lg border border-stone-100 opacity-0 animate-fade-in-up hover:-translate-y-2 transition-all duration-500 ease-in-out group"
          >
            <div className="h-64 w-full mb-6 rounded-xl overflow-hidden bg-stone-50">
              <img
                src={item.imgUrl}
                alt={item.name}
                className="h-full w-full object-cover overflow-x-hidden"
              />
            </div>

            <h3 className="text-2xl font-bold text-brandEarth mb-3">
              {item.name}
            </h3>
            <p className="text-brandEarth/80 font-sans text-sm leading-relaxed flex-grow mb-8">
              {item.description}
            </p>
            <div className="flex justify-between items-center mt-auto border-t border-stone-100 pt-6">
              <span className="text-2xl font-semibold text-brandSage">
                ${item.price.toFixed(2)}
              </span>{" "}
              <button
                onClick={() => addToCart(item)}
                className="flex items-center gap-2 px-6 py-2.5 bg-brandRose hover:bg-brandEarth text-white font-sans text-sm uppercase rounded-full transition-colors duration-300"
              >
                <FiPlus className="text-lg" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
