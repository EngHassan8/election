import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Header  from "../componets/Header"
function Contact() {
  return (
    <div>
      <Header/>

    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          Contact Us / Nala Soo Xiriir
        </h2>
        <p className="text-center text-gray-700 mb-10">
          Waxaan jeclaan lahayn inaan kaa maqlo! Fadlan noo soo dir fariintaada hoos.
        </p>

        <form className="space-y-6 max-w-xl mx-auto">
          <div>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="name">
              Name / Magac
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">
              Email / Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="message">
              Message / Fariin
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-md hover:bg-blue-800 transition"
          >
            Send / Dir
          </button>
        </form>

        <div className="mt-16 max-w-xl mx-auto text-center text-gray-700 space-y-4">
          <p className="flex items-center justify-center space-x-3">
            <FaPhone className="text-blue-700" /> 
            <span>+252 61 234 5678</span>
          </p>
          <p className="flex items-center justify-center space-x-3">
            <FaEnvelope className="text-blue-700" /> 
            <span>contact@yourdomain.com</span>
          </p>
          <p className="flex items-center justify-center space-x-3">
            <FaMapMarkerAlt className="text-blue-700" /> 
            <span>Mogadishu, Somalia</span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
