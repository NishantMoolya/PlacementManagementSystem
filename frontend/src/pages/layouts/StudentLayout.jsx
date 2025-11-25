import { NavLink, Outlet } from "react-router-dom";
import { Briefcase, UserCircle, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducers/userReducer";

const StudentLayout = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const menuItems = [
    { name: "Profile", icon: <UserCircle size={20} />, path: "/student/profile" },
    { name: "Drives", icon: <Briefcase size={20} />, path: "/student/drives" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside
        className={`bg-white shadow-xl border-r transition-all duration-300
        flex flex-col ${open ? "w-64" : "w-20"}`}
      >

        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b">
          <div className="text-blue-600 font-bold text-2xl tracking-wide">
            {open ? "Student" : "S"}
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-6 flex flex-col gap-1 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
                transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              {open && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
          ))}

          {/* Logout */}
          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-4 px-4 py-3 mt-10 rounded-lg text-red-600
            hover:bg-red-100 transition w-full"
          >
            <LogOut size={20} />
            {open && <span className="text-sm font-medium">Logout</span>}
          </button>
        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 relative">

        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`absolute top-6 transition-all duration-300
          ${open ? "left-0" : "left-0"}
          bg-white border shadow-lg p-2 rounded-full hover:bg-gray-100`}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Content */}
        <div className="pt-4">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default StudentLayout;
