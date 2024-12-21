import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/axios';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    email: string;
  };
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const isInstructor = user?.role === 'instructor';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const title = prompt('Enter course title:');
      const description = prompt('Enter course description:');

      if (!title || !description) return;

      await api.post('/courses', { title, description });
      await fetchCourses();
      alert('Course created successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Failed to create course');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await api.delete(`/courses/${courseId}`);
      await fetchCourses();
      alert('Course deleted successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Failed to delete course');
      } else {
        alert('An unexpected error occurred');
      }
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
              <div key={course._id} className="border p-4 rounded">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-gray-600 mt-2">{course.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Instructor: {course.instructor.name}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                      onClick={() => router.push(`/courses/${course._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View Content
                  </button>
                  {(isAdmin || (isInstructor && course.instructor.email === user?.email)) && (
                      <button
                          onClick={() => handleDeleteCourse(course._id)}
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
}