// pages/courses/[id].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/axios';
import withAuth from '../../utils/withAuth';
import { ContentUpload } from '../../components/courses/ContentUpload';
import CourseContent from '../../components/courses/CourseContent';
import Layout from '../../components/Layout'; // <-- import our layout


interface ContentItem {
  title: string;
  description: string;
  type: string;
  url: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  content?: ContentItem[];
}

interface User {
  role: string;
[key: string]: unknown; 
}

const SingleCoursePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // 1. Fetch the course from GET /courses/:id
  const fetchCourse = async (courseId: string | string[] | undefined) => {
    if (!courseId) return;
    try {
      const response = await api.get(`/courses/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Failed to load course data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. On mount, load user & course
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (id) {
      fetchCourse(id);
    }
  }, [id]);

  // 3. Re-fetch after uploading new content
  const handleUploadSuccess = () => {
    if (id) {
      fetchCourse(id);
    }
  };

  // 4. Enroll if user is a student
  const handleEnroll = async () => {
    try {
      const token = sessionStorage.getItem('access_token'); // Get token from sessionStorage
      if (!token) {
        alert('You are not logged in.');
        return;
      }
  
      const response = await api.post(
        '/courses/enroll',
        { courseId: course?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        alert('Enrolled successfully!');
      } else {
        throw new Error('Enrollment failed!');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to enroll in the course. Please try again.');
    }
  };
  

  // Loading or missing course
  if (loading) {
    return (
      <Layout>
        <p>Loading course content...</p>
      </Layout>
    );
  }
  if (!course) {
    return (
      <Layout>
        <p>Course not found.</p>
      </Layout>
    );
  }

  return (
    <Layout title={course.title}>
      <div className="bg-white rounded shadow p-4 fade-in">
        <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
        <p className="mb-6 text-gray-700">{course.description}</p>

        <CourseContent content={course.content || []} />

        {/* Upload only if user is instructor */}
        {user?.role === 'instructor' && (
          <div className="mt-6">
            <ContentUpload
              courseId={course.id}
              onUploadSuccess={handleUploadSuccess}
            />
          </div>
        )}

        {/* Enroll only if user is student */}
        {user?.role === 'student' && (
          <div className="mt-6">
            <button
              onClick={handleEnroll}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Enroll in Course
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(SingleCoursePage);
