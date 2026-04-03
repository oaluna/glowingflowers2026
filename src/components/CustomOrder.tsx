import React, { useState } from "react";

// 1. Define the blueprint for custom order requests
interface CustomOrderData {
  name: string;
  email: string;
  occasion: string;
  colorScheme: string;
  budget: string;
  notes: string;
}

const CustomOrder: React.FC = () => {
  // 2. Set up the state
  const [formData, setFormData] = useState<CustomOrderData>({
    name: "",
    email: "",
    occasion: "",
    colorScheme: "",
    budget: "",
    notes: "",
  });

  // 3. Handle user input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 4. Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Custom Order Request:", formData);
    alert(
      `Thanks, ${formData.name}! We'll review your custom request and reach out soon.`
    );

    // Clear the form
    setFormData({
      name: "",
      email: "",
      occasion: "",
      colorScheme: "",
      budget: "",
      notes: "",
    });
  };

  // Reusable Tailwind classes for inputs
  const inputStyles =
    "w-full p-2 mt-1 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all";

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-gray-900 rounded-lg shadow-xl border border-gray-800">
      <h2 className="text-3xl font-bold text-pink-400 mb-2">
        Request a Custom Arrangement
      </h2>
      <p className="text-gray-400 mb-6">
        Have a specific vision? Let us craft the perfect glowing arrangement for
        you.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <label className="text-sm font-semibold text-gray-300 flex-1">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </label>

          <label className="text-sm font-semibold text-gray-300 flex-1">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </label>
        </div>

        <label className="text-sm font-semibold text-gray-300">
          Occasion:
          <input
            type="text"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            placeholder="e.g., Anniversary, Apology, Just Because"
            required
            className={inputStyles}
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-5">
          <label className="text-sm font-semibold text-gray-300 flex-1">
            Color Scheme:
            <input
              type="text"
              name="colorScheme"
              value={formData.colorScheme}
              onChange={handleChange}
              placeholder="e.g., Deep reds, Pastel pinks"
              required
              className={inputStyles}
            />
          </label>

          <label className="text-sm font-semibold text-gray-300 flex-1">
            Estimated Budget ($):
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              min="0"
              required
              className={inputStyles}
            />
          </label>
        </div>

        <label className="text-sm font-semibold text-gray-300">
          Specific Flowers & Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Tell us your favorite flowers, sizes, or any allergies..."
            className={inputStyles}
          />
        </label>

        <button
          type="submit"
          className="mt-4 px-4 py-3 bg-pink-600 text-white font-bold rounded hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 transition-colors"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default CustomOrder;
