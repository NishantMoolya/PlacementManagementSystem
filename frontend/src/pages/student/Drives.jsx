import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { NavLink } from "react-router-dom";
import { Eye, Pencil } from "lucide-react";

const Drives = () => {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const res = await axiosInstance.get("/drives/");
        setDrives(res.data.data || []);
      } catch (err) {
        console.error("Error loading drives:", err);
      }
    };
    fetchDrives();
  }, []);

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Company Drives</h1>
        <p className="text-gray-500 mt-1">
          Explore and register for upcoming placement drives
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Company</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Drive Date</th>
                <th className="p-4 font-semibold text-gray-600 text-center">CTC</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {drives.map((d, index) => (
                <tr
                  key={d.id}
                  className={`border-t transition hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  <td className="p-4 font-medium text-gray-800">
                    {d.company_name}
                  </td>

                  <td className="p-4 text-center text-gray-700">
                    {d.drive_date}
                  </td>

                  <td className="p-4 text-center text-gray-700">
                    {d.ctc}
                  </td>

                  <td className="p-4 flex justify-center gap-4">
                    <NavLink
                      to={`/student/drives/${d.id}`}
                      className="text-blue-600 hover:text-blue-800 transition font-medium flex justify-center gap-1 items-center"
                    >
                      <Eye size={18} />
                      <span className="hidden md:inline">View</span>
                    </NavLink>

                    <NavLink
                      to={`/student/drive/register/${d.id}`}
                      className="text-purple-600 hover:text-purple-800 transition font-medium flex justify-center gap-1 items-center"
                    >
                      <Pencil size={18} />
                      <span className="hidden md:inline">Register</span>
                    </NavLink>
                  </td>
                </tr>
              ))}

              {drives.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No drives available right now.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Drives;
