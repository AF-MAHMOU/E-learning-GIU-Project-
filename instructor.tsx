import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!user?.id || user.role !== 'instructor') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (typeof window === 'undefined' || !user || user.role !== 'instructor') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Instructor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => router.push('/courses/create')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create New Course
              </button>
              <button
                onClick={() => router.push('/quizzes/create')}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Create New Quiz
              </button>
            </div>
          </div>
          <div className="bg-green-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Course Stats</h2>
            <p className="text-gray-600">View your course statistics and student progress</p>
            <button
              onClick={() => router.push('/dashboard/stats')}
              className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              View Stats
            </button>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            <p className="text-gray-600">Check student submissions and questions</p>
            <button
              onClick={() => router.push('/notifications')}
              className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              View Notifications
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">My Courses</h2>
          <button
            onClick={() => router.push('/dashboard/MyCourses')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Manage All Courses
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600">View and manage all your courses in one place</p>
            <button
              onClick={() => router.push('/dashboard/MyCourses')}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to My Courses
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          <button
            onClick={() => router.push('/dashboard/activity')}
            className="text-blue-600 hover:text-blue-800"
          >
            View All
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600">No recent activity</p>
        </div>
      </div>
    </div>
  );
}
