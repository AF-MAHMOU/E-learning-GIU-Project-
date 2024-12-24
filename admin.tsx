import React from 'react';
import Layout from '@components/Layout';
import withAuth from '@utils/withAuth';

const AdminDashboard: React.FC = () => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Users */}
          <div
            onClick={() => handleNavigation('/admin/manage-users')}
            className="cursor-pointer p-6 bg-blue-100 hover:bg-blue-200 transition rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
          >
            <h2 className="text-xl font-bold text-blue-800">Manage Users</h2>
            <p className="text-gray-600 mt-2">Add, edit, or remove users in the system.</p>
          </div>

          {/* Manage Courses */}
          <div
            onClick={() => handleNavigation('/admin/manage-courses')}
            className="cursor-pointer p-6 bg-green-100 hover:bg-green-200 transition rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
          >
            <h2 className="text-xl font-bold text-green-800">Manage Courses</h2>
            <p className="text-gray-600 mt-2">Create, update, or delete courses.</p>
          </div>

          {/* View Analytics */}
          <div
            onClick={() => handleNavigation('/admin/analytics')}
            className="cursor-pointer p-6 bg-purple-100 hover:bg-purple-200 transition rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
          >
            <h2 className="text-xl font-bold text-purple-800">View Analytics</h2>
            <p className="text-gray-600 mt-2">View system usage and performance statistics.</p>
          </div>

          {/* Access Logs */}
          <div
            onClick={() => handleNavigation('/admin/logs')}
            className="cursor-pointer p-6 bg-red-100 hover:bg-red-200 transition rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
          >
            <h2 className="text-xl font-bold text-red-800">Access Logs</h2>
            <p className="text-gray-600 mt-2">Review recent activities and logs.</p>
          </div>

          {/* Settings */}
          <div
            onClick={() => handleNavigation('/admin/settings')}
            className="cursor-pointer p-6 bg-yellow-100 hover:bg-yellow-200 transition rounded-lg shadow-lg flex items-center justify-center flex-col text-center"
          >
            <h2 className="text-xl font-bold text-yellow-800">Settings</h2>
            <p className="text-gray-600 mt-2">Configure system and admin preferences.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Apply withAuth and restrict access to "admin" role
export default withAuth(AdminDashboard, { allowedRoles: ['admin'] });
