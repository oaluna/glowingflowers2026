import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { rtdb } from "../firebase";
import { FiPlusCircle, FiCheckCircle } from "react-icons/fi";

const AdminPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productsRef = ref(rtdb, "products");

      // Generate a new unique key for the arrangement
      const newProductRef = push(productsRef);

      // Save the data to that new key
      await set(newProductRef, {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
      });

      setStatus({
        type: "success",
        message: `${formData.name} added to catalog!`,
      });
      setFormData({ name: "", price: "", description: "", category: "" });
      setTimeout(() => setStatus({ type: "idle", message: "" }), 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      setStatus({
        type: "error",
        message: "Failed to add product. Try again.",
      });
    }
  };

  const inputStyles =
    "w-full p-3 mt-2 bg-transparent text-brandEarth border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRose transition-all font-sans tracking-wide";
  const labelStyles =
    "text-xs font-bold font-sans uppercase tracking-widest text-brandEarth/70";

  return (
    <div className="max-w-2xl mx-auto p-8 mt-12 mb-20 bg-white rounded-2xl shadow-sm border border-stone-100 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-4xl text-brandEarth mb-3">Store Admin</h2>
        <p className="text-brandEarth/60 italic">
          Add a new arrangement to your catalog.
        </p>
      </div>

      {status.type === "success" && (
        <div className="mb-6 p-4 bg-brandSage/20 text-brandSage flex items-center gap-2 rounded-lg font-sans text-sm font-bold tracking-wide">
          <FiCheckCircle className="text-lg" /> {status.message}
        </div>
      )}

      {status.type === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg font-sans text-sm font-bold tracking-wide">
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <label className={`${labelStyles} flex-1`}>
            Arrangement Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </label>
          <label className={`${labelStyles} w-full sm:w-1/3`}>
            Price ($)
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className={inputStyles}
            />
          </label>
        </div>
        <label className={labelStyles}>
          Image URL
          <input
            type="url"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={inputStyles}
          />
        </label>
        <label className={labelStyles}>
          Description
          <textarea
            name="desc"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className={inputStyles}
          />
        </label>
        <button
          type="submit"
          className="mt-4 flex items-center justify-center gap-2 py-4 bg-brandEarth text-white font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-brandRose transition-colors shadow-md"
        >
          <FiPlusCircle className="text-lg" /> Publish to Storefront
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
