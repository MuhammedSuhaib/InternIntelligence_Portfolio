"use client";
import Link from "next/link";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactPage = () => {
  const [state, handleSubmit] = useForm("mwpobpor"); 

  if (state.succeeded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-2xl font-bold mb-4">Thanks for your message!</h2>
        <Link href="/">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            Back to Home
          </button>
        </Link>
      </div>
      
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Contact Me
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 p-4 w-full rounded-md border border-gray-300 bg-white/5 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300 hover:bg-white/10"
                placeholder="Your name"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="mt-1 p-4 w-full rounded-md border border-gray-300 bg-white/5 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300 hover:bg-white/10"
                placeholder="your@email.com"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 p-4 w-full rounded-md border border-gray-300 bg-white/5 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-300 hover:bg-white/10"
                placeholder="Your message"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-3 px-4 rounded-md bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-8 space-y-4 text-center text-white">
            <p> Address: P&T society, Korangi, Karachi, Pakistan.</p>
          </div>

          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="https://www.linkedin.com/in/suhaib1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-indigo-200 transition duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/MuhammedSuhaib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-indigo-200 transition duration-300"
            >
              GitHub
            </a>
          </div>
        </div>

        <Link href="/" className="mt-6">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
