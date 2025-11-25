import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "@/api/axios";

export default function DriveAttendance() {
  const { drive_id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`/drive-management/${drive_id}/attendance`).then((res) => {
      setStudents(res.data.data);
    });
  }, [drive_id]);

  const markAttendance = async (studentId, attended) => {
    await axios.post(`/drive-management/${drive_id}/attendance/${studentId}`, {
      attended,
    });

    setStudents((prev) =>
      prev.map((s) =>
        s.student_id === studentId ? { ...s, attended } : s
      )
    );
  };

  const updateShortlist = async (studentId, status) => {
    await axios.post(`/drive-management/${drive_id}/shortlist/${studentId}`, {
      status,
    });

    setStudents((prev) =>
      prev.map((s) =>
        s.student_id === studentId ? { ...s, shortlist_status: status } : s
      )
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Drive Attendance
      </h1>

      <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-6">
        <table className="w-full border-collapse rounded-2xl overflow-hidden">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="text-left">
              <th className="p-3 text-sm font-semibold text-gray-600">USN</th>
              <th className="p-3 text-sm font-semibold text-gray-600">Name</th>
              <th className="p-3 text-sm font-semibold text-gray-600">Attendance</th>
              <th className="p-3 text-sm font-semibold text-gray-600">Shortlist</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr
                key={s.student_id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="p-3 text-gray-700 font-medium">{s.usn}</td>
                <td className="p-3 text-gray-800">{s.student_name}</td>

                {/* Attendance buttons */}
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => markAttendance(s.student_id, 1)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                        s.attended === 1
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      Present
                    </button>

                    <button
                      onClick={() => markAttendance(s.student_id, 0)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                        s.attended === 0
                          ? "bg-red-600 text-white"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </td>

                {/* Shortlist dropdown */}
                <td className="p-3">
                  <select
                    value={s.shortlist_status || "pending"}
                    onChange={(e) =>
                      updateShortlist(s.student_id, e.target.value)
                    }
                    className="border px-3 py-2 rounded-lg text-sm focus:ring focus:ring-blue-200"
                  >
                    <option value="pending">Pending</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No students found for this drive.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
