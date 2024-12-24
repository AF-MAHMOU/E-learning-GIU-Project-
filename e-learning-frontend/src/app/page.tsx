'use client'; // If Next.js 13 App Router
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
export default function HomePage() {
  const [showRegisterOptions, setShowRegisterOptions] = useState(false);

  const handleToggleRegister = () => {
    setShowRegisterOptions((prev) => !prev);
  };

  return (
    <Layout title="Welcome to E-Learning">
      <div className="fade-in flex flex-col items-center justify-center space-y-6 bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold">Welcome to E-Learning</h1>
        <p className="text-gray-600 text-center max-w-md">
          Empower yourself with knowledge! Explore our wide range of courses
          and level up your skills.
        </p>

        <div className="flex space-x-4">
          {/* Show Courses button */}
          <Link
            href="/courses"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Show Courses
          </Link>

          {/* Register button: toggles sub-buttons */}
          <button
            onClick={handleToggleRegister}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {showRegisterOptions ? 'Hide Register' : 'Register'}
          </button>
        </div>

        {/* Sub-buttons for Student/Instructor registration */}
        {showRegisterOptions && (
          <div className="mt-4 flex space-x-4">
            <Link
              href="/auth/register/student"
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
            >
              Register as Student
            </Link>
            <Link
              href="/auth/register/instructor"
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition"
            >
              Register as Instructor
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
