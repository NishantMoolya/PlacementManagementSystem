import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/axios";

const SingleDrive = () => {
  const { id } = useParams();
  const [drive, setDrive] = useState(null);

  useEffect(() => {
    const fetchDrive = async () => {
      const res = await axiosInstance.get(`/drives/${id}`);
      setDrive(res.data.data);
    };
    fetchDrive();
  }, [id]);

  if (!drive)
    return (
      <div className="p-6 text-gray-600 text-lg animate-pulse">
        Loading drive details...
      </div>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {drive.company_name}
        </h1>
        <p className="text-gray-500 mt-1">
          Full details of the recruitment drive
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-6">

        {/* Section: Overview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem label="Role" value={drive.role} />
            <InfoItem label="CTC" value={drive.ctc} />
            <InfoItem label="Location" value={drive.job_location} />
            <InfoItem label="Drive Date" value={drive.drive_date} />
            <InfoItem label="Registration Deadline" value={drive.registration_deadline} />
            <InfoItem label="Rounds" value={drive.rounds_info} />
          </div>
        </div>

        {/* Section: Eligibility */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Eligibility Criteria</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Minimum CGPA:</strong> {drive.min_cgpa}
              </li>
              <li>
                <strong>Branches Allowed:</strong> {drive.allowed_branches}
              </li>
              <li>
                <strong>Max Backlogs Allowed:</strong> {drive.max_backlogs}
              </li>
              <li>
                <strong>10th Percentage:</strong> {drive.min_tenth_percent}
              </li>
              <li>
                <strong>12th Percentage:</strong> {drive.min_twelfth_percent}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleDrive;

// Small reusable info component
const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-lg font-medium text-gray-900">{value}</span>
  </div>
);
