import React, { useState } from "react";

interface CustomOrderData {
  name: string;
  email: string;
  occasion: string;
  colorScheme: string;
  budget: string;
  notes: string;
}

const CustomOrder: React.FC = () => {
  const [formData, setFormData] = useState<CustomOrderData>({
    name: "",
    email: "",
    occasion: "",
    colorScheme: "",
    budget: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thanks, ${formData.name}! We'll review your custom request and reach out soon.`
    );
    setFormData({
      name: "",
      email: "",
      occasion: "",
      colorScheme: "",
      budget: "",
      notes: "",
    });
  };

  const inputStyles =
    "w-full p-3 mt-2 bg-transparent text-brandEarth border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRose focus:border-transparent transition-all font-sans";
  const labelStyles =
    "text-xs font-bold font-sans uppercase tracking-widest text-brandEarth/70";

  return (
    <div className="max-w-xl mx-auto p-8 mt-12 mb-20 bg-white rounded-2xl shadow-sm border border-stone-100 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-4xl text-brandEarth mb-3">
          Request a Custom Arrangement
        </h2>
        <p className="text-brandEarth/60 italic">
          Crafted perfectly for your specific vision.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <label className={`${labelStyles} flex-1`}>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputStyles}
            />
          </label>

          <label className={`${labelStyles} flex-1`}>
            Email
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

        <label className={labelStyles}>
          Occasion
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

        <div className="flex flex-col sm:flex-row gap-6">
          <label className={`${labelStyles} flex-1`}>
            Color Scheme
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

          <label className={`${labelStyles} flex-1`}>
            Estimated Budget ($)
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

        <label className={labelStyles}>
          Specific Flowers & Notes
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
          className="mt-4 px-6 py-4 bg-brandRose text-white font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-brandEarth transition-colors shadow-md"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default CustomOrder;
