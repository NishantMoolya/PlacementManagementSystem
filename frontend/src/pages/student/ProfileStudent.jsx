import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";

export default function ProfileStudent() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [profile, setProfile] = useState({
    usn: "",
    branch: "",
    year: "",
    cgpa: "",
    backlogs: 0,
    tenth_percent: "",
    twelfth_percent: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/user/profile");

      if (res.data?.data?.profile) {
        setProfile(res.data.data.profile);
      }
    } catch (err) {
      setError("Failed to load profile");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await axiosInstance.post("/user/student/profile", profile);

      if (res.status === 200 || res.status === 201) {
        setSuccess(res.data.message || "Profile updated successfully!");
      } else {
        setError("Unexpected server response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-10 border border-gray-200">

        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Student Academic Profile
        </h2>

        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input label="USN" name="usn" value={profile.usn} onChange={handleChange} />
          <Input label="Branch" name="branch" value={profile.branch} onChange={handleChange} />

          <Input label="Year" name="year" value={profile.year} onChange={handleChange} />
          <Input
            label="CGPA"
            name="cgpa"
            type="number"
            step="0.01"
            value={profile.cgpa}
            onChange={handleChange}
          />

          <Input
            label="Backlogs"
            name="backlogs"
            type="number"
            value={profile.backlogs}
            onChange={handleChange}
          />

          <Input
            label="10th Percentage"
            name="tenth_percent"
            type="number"
            step="0.1"
            value={profile.tenth_percent}
            onChange={handleChange}
          />

          <Input
            label="12th Percentage"
            name="twelfth_percent"
            type="number"
            step="0.1"
            value={profile.twelfth_percent}
            onChange={handleChange}
          />

          {/* Status messages */}
          <div className="md:col-span-2 mt-2">
            {error && (
              <p className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </p>
            )}
            {success && (
              <p className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg text-sm">
                {success}
              </p>
            )}
          </div>

          {/* Save button */}
          <div className="md:col-span-2 mt-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md
              hover:bg-blue-700 transition-all duration-200 active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", step }) {
  return (
    <div>
      <label className="block text-gray-700 mb-1 font-medium">{label}</label>
      <input
        type={type}
        step={step}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
    </div>
  );
}
