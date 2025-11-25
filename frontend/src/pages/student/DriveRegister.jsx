import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/api/axios";

export default function DriveRegister() {
  const { drive_id } = useParams();
  const [drive, setDrive] = useState(null);

  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/drives/${drive_id}`);
        setDrive(res.data.data);
      } catch (err) {
        setError("Unable to load drive details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [drive_id]);

  const registerNow = async () => {
    setRegistering(true);
    setMessage("");
    setError("");
    setReasons([]);

    try {
      const res = await axios.post(
        `/drive-management/${drive_id}/register`,
        {},
        {
          validateStatus: (status) => status === 200 || status === 400,
        }
      );

      if (res.data.eligible === false) {
        setError("You are not eligible for this drive.");
        setReasons(res.data.reasons || []);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg text-gray-600 animate-pulse">
        Loading drive details...
      </div>
    );
  }

  if (error && !drive) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg">{error}</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Register for {drive.company_name} Drive
      </h1>
      <p className="text-gray-500 mb-6">
        Review the eligibility and click register to apply.
      </p>

      {/* Card */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 space-y-6">

        {/* Drive Overview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Drive Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="Role" value={drive.role} />
            <Info label="CTC" value={drive.ctc} />
            <Info label="Location" value={drive.job_location} />
            <Info label="Drive Date" value={drive.drive_date} />
          </div>
        </div>

        {/* Eligibility Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Eligibility Criteria</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><strong>Minimum CGPA:</strong> {drive.min_cgpa}</li>
              <li><strong>Maximum Backlogs:</strong> {drive.max_backlogs}</li>
              <li><strong>10th Percentage:</strong> {drive.min_tenth_percent}</li>
              <li><strong>12th Percentage:</strong> {drive.min_twelfth_percent}</li>
              <li><strong>Allowed Branches:</strong> {drive.allowed_branches}</li>
              <li><strong>Minimum Year:</strong> {drive.min_year}</li>
            </ul>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={registerNow}
          disabled={registering}
          className={`w-full py-3 rounded-lg text-white font-medium text-lg transition 
            ${
              registering
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {registering ? "Registering..." : "Register Now"}
        </button>

        {/* Success message */}
        {message && (
          <p className="text-green-600 font-semibold text-center">{message}</p>
        )}

        {/* Error message */}
        {error && (
          <div className="text-red-600 font-semibold text-center">{error}</div>
        )}

        {/* Eligibility Reasons */}
        {reasons.length > 0 && (
          <ul className="mt-2 text-red-500 text-sm list-disc ml-6">
            {reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* Small reusable info component */
const Info = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-lg font-medium text-gray-900">{value}</span>
  </div>
);
