import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDrive = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchDrive = async () => {
      const res = await axiosInstance.get(`/drives/${id}`);
      const d = res.data.data;

      setForm({
        company_name: d.company_name,
        role: d.role,
        ctc: d.ctc,
        job_location: d.job_location,
        drive_date: d.drive_date,
        registration_deadline: d.registration_deadline,
        rounds_info: d.rounds_info,
        min_cgpa: d.min_cgpa,
        allowed_branches: d.allowed_branches?.split(",") || [],
        min_year: d.min_year,
        max_backlogs: d.max_backlogs,
        min_tenth_percent: d.min_tenth_percent,
        min_twelfth_percent: d.min_twelfth_percent
      });
    };

    fetchDrive();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/drives/${id}`, form);
    navigate(`/tpo/drives/${id}`);
  };

  if (!form) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Drive</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-2xl space-y-8 border border-gray-100"
      >
        {/* Section 1 */}
        <h2 className="text-xl font-semibold text-gray-700">Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Role</label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">CTC (in LPA)</label>
            <input
              type="number"
              name="ctc"
              value={form.ctc}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Job Location</label>
            <input
              type="text"
              name="job_location"
              value={form.job_location}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold text-gray-700">Dates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600">Drive Date</label>
            <input
              type="date"
              name="drive_date"
              value={form.drive_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Registration Deadline</label>
            <input
              type="date"
              name="registration_deadline"
              value={form.registration_deadline}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold text-gray-700">Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-gray-600">Min CGPA</label>
            <input
              type="number"
              name="min_cgpa"
              value={form.min_cgpa}
              onChange={handleChange}
              step="0.1"
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Min Year</label>
            <input
              type="number"
              name="min_year"
              value={form.min_year}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Max Backlogs</label>
            <input
              type="number"
              name="max_backlogs"
              value={form.max_backlogs}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-gray-700">Rounds Information</h2>
        <textarea
          name="rounds_info"
          value={form.rounds_info}
          onChange={handleChange}
          rows="5"
          className="w-full border px-3 py-3 rounded-lg focus:ring focus:ring-blue-200"
        ></textarea>

        {/* Submit Button */}
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-3 rounded-xl text-lg font-medium">
          Update Drive
        </button>
      </form>
    </div>
  );
};

export default EditDrive;
