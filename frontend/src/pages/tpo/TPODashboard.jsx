import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, ClipboardList, UserCheck } from "lucide-react";

const TPODashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">TPO Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage company drives, student eligibility, attendance & more.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Total Drives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-700">23</p>
            <p className="text-gray-500">Active + Completed</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-5 h-5 text-green-600" />
              Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700">312</p>
            <p className="text-gray-500">Across all drives</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardList className="w-5 h-5 text-yellow-600" />
              Attendance Marked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-700">189</p>
            <p className="text-gray-500">Verified candidates</p>
          </CardContent>
        </Card>

      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card className="cursor-pointer hover:bg-blue-50 shadow-sm transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-md">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Create New Drive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Add company details, criteria & rounds</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-green-50 shadow-sm transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-md">
                <Users className="w-5 h-5 text-green-600" />
                View Registered Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage applicants for each drive</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-yellow-50 shadow-sm transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-md">
                <UserCheck className="w-5 h-5 text-yellow-600" />
                Mark Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Record candidate presence</p>
            </CardContent>
          </Card>

        </div>
      </div>

    </div>
  );
};

export default TPODashboard;
