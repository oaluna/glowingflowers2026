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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event Booking Request:", formData);
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

  // A reusable variable for our input styling to keep code clean
  const inputStyles =
    "w-full p-2 mt-1 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all";

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-gray-900 rounded-lg shadow-xl border border-gray-800">
      <h2 className="text-3xl font-bold text-pink-400 mb-2">
        Book Glowing Flowers
      </h2>
      <p className="text-gray-400 mb-6">
        Fill out the form below, and we will get in touch to discuss your
        vision!
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="text-sm font-semibold text-gray-300">
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

        <label className="text-sm font-semibold text-gray-300">
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

        <label className="text-sm font-semibold text-gray-300">
          Event Date:
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className={inputStyles}
          />
        </label>

        <label className="text-sm font-semibold text-gray-300">
          Event Type:
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

        <label className="text-sm font-semibold text-gray-300">
          Additional Details:
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Tell us about your theme, favorite flowers, or budget..."
            className={inputStyles}
          />
        </label>

        <button
          type="submit"
          className="mt-4 px-4 py-3 bg-pink-600 text-white font-bold rounded hover:bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50 transition-colors"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default EventBooking;
