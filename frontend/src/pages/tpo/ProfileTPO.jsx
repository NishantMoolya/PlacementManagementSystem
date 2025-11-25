"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { UserCircle } from "lucide-react";

export default function ProfileTPO() {
  const [form, setForm] = useState({
    designation: "",
    phone: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/user/profile");
      if (res.data?.data?.profile) {
        setForm({
          designation: res.data.data.profile.designation || "",
          phone: res.data.data.profile.phone || "",
          department: res.data.data.profile.department || "",
        });
      }
    } catch (err) {
      console.log("Error fetching tpo profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/user/tpo/profile", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
            <UserCircle size={38} />
          </div>
          <h2 className="text-3xl font-bold mt-3 tracking-wide text-gray-800">
            TPO Profile
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your official Training & Placement details
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <p className="text-center mb-6 bg-green-100 text-green-700 py-2 rounded-lg font-semibold">
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Designation */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 
              focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 
              focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 focus:ring-2 
              focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
            font-semibold text-lg shadow-md transition disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
