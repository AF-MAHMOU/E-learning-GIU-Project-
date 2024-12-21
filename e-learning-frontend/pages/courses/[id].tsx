import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/axios';
import { CourseContent } from '../../components/courses/CourseContent';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    email: string;
  };
}

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Failed to fetch course:', error);
      router.push('/courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading course...</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => router.push('/courses')}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Courses
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Instructor: {course.instructor.name}
        </p>
      </div>

      <CourseContent courseId={course._id} />
    </div>
  );
}
