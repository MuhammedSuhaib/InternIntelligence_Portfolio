"use client";

import Link from "next/link";
import React from "react";
import Header from "@/components/Header";
import Swal from "sweetalert2";

const ContactPage = () => {
  return (
    <div className="size-full bg-gradient-to-b from-black to-[#26045c] transition-all hover:bg-gradient-to-br hover:from-[#32027e] hover:to-black py-12 px-4 sm:px-6 lg:px-8">
      <Header />

      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Contact Me
        </h2>

        {/* Contact Form */}
        <form onSubmit={() => Swal.fire({
          title: `Send`,
          icon: 'success',
          confirmButtonText: 'OK'
        })} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/5 text-white transition duration-300 hover:bg-white/10"
              placeholder="Your name"
            />
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
              className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/5 text-white transition duration-300 hover:bg-white/10"
              placeholder="your@email.com"
            />
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
              className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/5 text-white transition duration-300 hover:bg-white/10"
              placeholder="Your message"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="mt-8 space-y-4 flex flex-col justify-center items-center">
          <div className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-300">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <a href="mailto:muhammedsuhaib@example.com">muhammedsuhaib@example.com</a>
          </div>

          <div className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-300">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>123 Example Street, City, Country</span>
          </div>

          <div className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-300">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <Link href="tel:+15551234567">+1 (555) 123-4567</Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-row justify-evenly mt-6">
          <a
            href="https://www.linkedin.com/in/suhaib1/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-300"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </a>

          <a
            href="https://github.com/MuhammedSuhaib"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-white hover:text-indigo-200 transition duration-300"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Back to Home Button */}
      <Link href="/">
        <button className="ml-[46%] mx-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105 mt-6">
          Back to Home
        </button>
      </Link>
    </div>
  );
};
export default ContactPage;