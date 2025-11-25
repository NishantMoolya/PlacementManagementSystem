import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { NavLink } from "react-router-dom";
import { Briefcase, Plus, Eye, Pencil, ClipboardList } from "lucide-react";

const DriveList = () => {
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
    <div className="p-8">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Briefcase size={30} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            Company Drives
          </h1>
        </div>

        <NavLink
          to="/tpo/drives/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
          text-white rounded-lg shadow-md transition"
        >
          <Plus size={20} />
          <span>Create Drive</span>
        </NavLink>
      </div>

      {/* Table Container */}
      <div className="bg-white border shadow-xl rounded-xl overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-gray-700 font-semibold">Company</th>
              <th className="p-4 text-center text-gray-700 font-semibold">Drive Date</th>
              <th className="p-4 text-center text-gray-700 font-semibold">CTC</th>
              <th className="p-4 text-center text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {drives.map((d) => (
              <tr
                key={d.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">{d.company_name}</td>
                <td className="p-4 text-center text-gray-600">{d.drive_date}</td>
                <td className="p-4 text-center text-gray-600">{d.ctc}</td>

                <td className="p-4">
                  <div className="flex gap-4 justify-center">

                    <NavLink
                      to={`/tpo/drives/${d.id}`}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                    >
                      <Eye size={18} />
                      <span className="hidden md:inline">View</span>
                    </NavLink>

                    <NavLink
                      to={`/tpo/drives/${d.id}/edit`}
                      className="flex items-center gap-1 text-green-600 hover:text-green-800 transition"
                    >
                      <Pencil size={18} />
                      <span className="hidden md:inline">Edit</span>
                    </NavLink>

                    <NavLink
                      to={`/tpo/drives/${d.id}/attendance`}
                      className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition"
                    >
                      <ClipboardList size={18} />
                      <span className="hidden md:inline">Attendance</span>
                    </NavLink>

                  </div>
                </td>
              </tr>
            ))}

            {drives.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No drives found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default DriveList;
