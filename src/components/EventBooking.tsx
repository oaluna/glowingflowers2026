import React, { useState } from "react";

interface BookingFormData {
  name: string;
  email: string;
  eventDate: string;
  eventType: string;
  details: string;
}

const EventBooking: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    eventDate: "",
    eventType: "Wedding",
    details: "",
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
      `Thank you, ${formData.name}! We will contact you about your ${formData.eventType} shortly.`
    );
    setFormData({
      name: "",
      email: "",
      eventDate: "",
      eventType: "Wedding",
      details: "",
    });
  };

  // The new, sophisticated input styling!
  const inputStyles =
    "w-full p-3 mt-2 bg-transparent text-brandEarth border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRose focus:border-transparent transition-all font-sans";
  const labelStyles =
    "text-xs font-bold font-sans uppercase tracking-widest text-brandEarth/70";

  return (
    <div className="max-w-xl mx-auto p-8 mt-12 mb-20 bg-white rounded-2xl shadow-sm border border-stone-100 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-4xl text-brandEarth mb-3">Book an Event</h2>
        <p className="text-brandEarth/60 italic">
          Let us bring your vision to life.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className={labelStyles}>
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

        <label className={labelStyles}>
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputStyles}
          />
        </label>

        <label className={labelStyles}>
          Event Date
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className={inputStyles}
          />
        </label>

        <label className={labelStyles}>
          Event Type
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Birthday Party">Birthday Party</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className={labelStyles}>
          Additional Details
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Themes, favorite flowers, budget..."
            className={inputStyles}
          />
        </label>

        <button
          type="submit"
          className="mt-4 px-6 py-4 bg-brandRose text-white font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-brandEarth transition-colors shadow-md"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default EventBooking;
