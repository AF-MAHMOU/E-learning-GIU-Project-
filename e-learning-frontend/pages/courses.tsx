import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/axios';
import withAuth from '../utils/withAuth';
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    email: string;
  };
}

interface User {
  role: string;
  email: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const isInstructor = user?.role === 'instructor';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchUser = () => {
      if (typeof window !== 'undefined') {
        const userData = sessionStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData) as User);
        }
      }
    };

    fetchUser();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      console.log('API Response:', response.data); // Log the response data
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const title = prompt('Enter course title:');
      const description = prompt('Enter course description:');

      if (!title || !description) return;

      const response = await api.post('/courses', { title, description });
      if (response.status === 201) {
        fetchCourses();
        alert('Course created successfully!');
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      alert('An error occurred while creating the course.');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await api.delete(`/courses/${courseId}`);
      if (response.status === 200) {
        fetchCourses();
        alert('Course deleted successfully');
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('An error occurred while deleting the course.');
    }
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        {(isInstructor || isAdmin) && (
          <button
            onClick={handleCreateCourse}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Course
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Instructor: {course.instructor?.name || 'Unknown'}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => router.push(`/courses/${course.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                View Content
              </button>
              {(isAdmin || (isInstructor && course.instructor?.email === user?.email)) && (
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No courses available.</p>
      )}
    </div>
  );
};

export default withAuth(CoursesPage);
