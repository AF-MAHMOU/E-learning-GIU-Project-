import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import withAuth from '../../utils/withAuth';

interface Course {
  id: string;
  title: string;
  description: string;
}

const StudentDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await api.get('/courses/enrolled', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
      alert('Failed to load your courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return <div>Loading your courses...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      {courses.length > 0 ? (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You are not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default withAuth(StudentDashboard, { allowedRoles: ['student'] });
