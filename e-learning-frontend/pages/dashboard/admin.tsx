import React from 'react';
import Layout from '../../components/Layout';
import withAuth from '../../utils/withAuth';

const AdminDashboard: React.FC = () => {
  const handleManageUsers = () => {
    window.location.href = '/admin/manage-users';
  };

  const handleManageCourses = () => {
    window.location.href = '/admin/manage-courses';
  };

  return (
    <Layout title="Admin Dashboard">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={handleManageUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Manage Users
        </button>
        <button
          onClick={handleManageCourses}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        >
          Manage Courses
        </button>
      </div>
    </Layout>
  );
};

// Apply withAuth and restrict access to "admin" role
export default withAuth(AdminDashboard, { allowedRoles: ['admin'] });
