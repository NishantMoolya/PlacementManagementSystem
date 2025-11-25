import { useState } from "react";
import axiosInstance from "@/api/axios";
import { useNavigate } from "react-router-dom";

const branchOptions = [
  "CSE", "ISE", "ECE", "EEE", "CIVIL", "MECH", "AIML", "DS",
];

export default function CreateDrive() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    role: "",
    ctc: "",
    job_location: "",
    drive_date: "",
    registration_deadline: "",
    rounds_info: "",
    min_cgpa: "",
    allowed_branches: [],
    min_year: "",
    max_backlogs: "",
    min_tenth_percent: "",
    min_twelfth_percent: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleBranch = (branch) => {
    setForm((prev) => ({
      ...prev,
      allowed_branches: prev.allowed_branches.includes(branch)
        ? prev.allowed_branches.filter((b) => b !== branch)
        : [...prev.allowed_branches, branch],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/drives/", form);
      alert("Drive created successfully!");
      navigate("/tpo/drives");
    } catch (err) {
      console.log(err);
      alert("Error creating drive");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Drive</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-8"
      >
        {/* Company Section */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-700">Company Name</label>
          <input
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
            placeholder="Amazon, Google, Infosys..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-gray-700">Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              placeholder="Software Engineer, Analyst..."
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">CTC (LPA)</label>
            <input
              type="number"
              name="ctc"
              value={form.ctc}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        {/* Job Location */}
        <div>
          <label className="font-semibold text-gray-700">Job Location</label>
          <input
            name="job_location"
            value={form.job_location}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-gray-700">Drive Date</label>
            <input
              type="date"
              name="drive_date"
              value={form.drive_date}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Registration Deadline</label>
            <input
              type="date"
              name="registration_deadline"
              value={form.registration_deadline}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        {/* Rounds Info */}
        <div>
          <label className="font-semibold text-gray-700">Rounds Information</label>
          <textarea
            name="rounds_info"
            value={form.rounds_info}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg bg-gray-50 h-32 focus:ring focus:ring-blue-300"
            placeholder="Round 1: Online Test, Round 2: Technical Interview..."
            required
          ></textarea>
        </div>

        {/* Eligibility */}
        <h2 className="text-xl font-semibold text-gray-800">Eligibility Criteria</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="font-semibold text-gray-700">Minimum CGPA</label>
            <input
              type="number"
              step="0.1"
              name="min_cgpa"
              value={form.min_cgpa}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Minimum Year</label>
            <input
              type="number"
              name="min_year"
              value={form.min_year}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              placeholder="2, 3, 4..."
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Max Backlogs</label>
            <input
              type="number"
              name="max_backlogs"
              value={form.max_backlogs}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        {/* Percentages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-gray-700">Min 10th %</label>
            <input
              type="number"
              name="min_tenth_percent"
              value={form.min_tenth_percent}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Min 12th %</label>
            <input
              type="number"
              name="min_twelfth_percent"
              value={form.min_twelfth_percent}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg bg-gray-50 focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        {/* Branch Selector */}
        <div>
          <label className="font-semibold text-gray-700">Allowed Branches</label>

          <div className="flex flex-wrap gap-3 mt-3">
            {branchOptions.map((branch) => (
              <button
                key={branch}
                type="button"
                onClick={() => toggleBranch(branch)}
                className={`px-4 py-2 rounded-full border text-sm transition 
                  ${
                    form.allowed_branches.includes(branch)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }
                `}
              >
                {branch}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          Create Drive
        </button>
      </form>
    </div>
  );
}
