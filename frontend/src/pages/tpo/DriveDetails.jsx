import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axiosInstance from "@/api/axios";

export default function DriveDetails() {
  const { id } = useParams();
  const [drive, setDrive] = useState(null);

  useEffect(() => {
    const fetchDrive = async () => {
      const res = await axiosInstance.get(`/drives/${id}`);
      setDrive(res.data.data);
    };
    fetchDrive();
  }, [id]);

  if (!drive) return <div className="p-8 text-gray-600">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {drive.company_name}
        </h1>

        <NavLink
          to={`/tpo/drives/${id}/edit`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow"
        >
          Edit Drive
        </NavLink>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

        {/* Basic Info */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Drive Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info label="Role" value={drive.role} />
            <Info label="CTC (LPA)" value={drive.ctc} />
            <Info label="Job Location" value={drive.job_location} />
            <Info label="Drive Date" value={drive.drive_date} />
            <Info label="Registration Deadline" value={drive.registration_deadline} />
          </div>
        </section>

        {/* Rounds */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Rounds</h2>
          <div className="bg-gray-50 p-4 rounded-lg border text-gray-700 leading-relaxed">
            {drive.rounds_info}
          </div>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Eligibility Criteria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Info label="Minimum CGPA" value={drive.min_cgpa} />
            <Info label="Max Backlogs" value={drive.max_backlogs} />
            <Info label="10th % Required" value={drive.min_tenth_percent} />
            <Info label="12th % Required" value={drive.min_twelfth_percent} />
            <Info label="Minimum Year" value={drive.min_year} />
          </div>

          {/* Branches */}
          <div className="mt-4">
            <label className="font-semibold text-gray-700 block mb-2">
              Allowed Branches
            </label>

            <div className="flex flex-wrap gap-3">
              {drive.allowed_branches?.split(",").map((branch, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full border border-blue-300"
                >
                  {branch}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* --- Small Reusable Component --- */
const Info = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-gray-800 font-medium">{value || "—"}</p>
  </div>
);
