import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { NavLink } from "react-router-dom";

const featuredDrives = [
    {
      id: 1,
      company_name: "Google",
      role: "Software Engineer",
      ctc: "₹30 LPA",
      job_location: "Bangalore",
      drive_date: "2025-12-10",
    },
    {
      id: 2,
      company_name: "Microsoft",
      role: "Backend Developer",
      ctc: "₹28 LPA",
      job_location: "Hyderabad",
      drive_date: "2025-12-15",
    },
    {
      id: 3,
      company_name: "Amazon",
      role: "Cloud Engineer",
      ctc: "₹32 LPA",
      job_location: "Bangalore",
      drive_date: "2025-12-20",
    },
  ];

export default function Home() {
  const [drives, setDrives] = useState(featuredDrives);
  const [stats, setStats] = useState({ totalDrives: 20, totalStudents: 800, totalCompanies: 250 });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Placement Management System
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Track drives, register for opportunities, and stay updated with all placements.
        </p>
        <NavLink
          to="/login"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Explore Drives
        </NavLink>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold">{stats.totalStudents}</h2>
            <p className="text-gray-500 mt-2">Registered Students</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold">{stats.totalDrives}</h2>
            <p className="text-gray-500 mt-2">Upcoming Drives</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-bold">{stats.totalCompanies}</h2>
            <p className="text-gray-500 mt-2">Participating Companies</p>
          </div>
        </div>
      </section>

      {/* Upcoming Drives */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Upcoming Drives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {drives.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">No drives available.</p>
          )}
          {drives.map(drive => (
            <div key={drive.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{drive.company_name}</h3>
                <p className="text-gray-500 mb-1"><strong>Role:</strong> {drive.role}</p>
                <p className="text-gray-500 mb-1"><strong>CTC:</strong> {drive.ctc}</p>
                <p className="text-gray-500 mb-1"><strong>Location:</strong> {drive.job_location}</p>
                <p className="text-gray-500"><strong>Date:</strong> {drive.drive_date}</p>
              </div>
              <NavLink
                to={`/login`}
                className="mt-4 inline-block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
              >
                View / Register
              </NavLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
