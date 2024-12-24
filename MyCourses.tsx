import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { coursesService } from '../../services';
import { useAuth } from '../../hooks/useAuth';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  enrolledStudents?: number;
}

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fetchCourses = async () => {
      try {
        if (!user?.id) {
          router.push('/auth/login');
          return;
        }
        // For instructors, we'll get their created courses
        const data = await coursesService.getAllCourses();
        // Filter courses for the current instructor
        const instructorCourses = data.filter((course: Course) => course.instructor === user.id);
        setCourses(instructorCourses || []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user?.id, router]);

  if (typeof window === 'undefined' || loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user?.id) {
    return null; // Will redirect in useEffect
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">No Created Courses</h2>
        <p className="text-gray-600">You have not created any courses yet.</p>
        <button
          onClick={() => router.push('/courses/create')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Course
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Created Courses</h1>
        <button
          onClick={() => router.push('/courses/create')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            {course.enrolledStudents !== undefined && (
              <p className="text-sm text-gray-500 mb-4">
                Students Enrolled: {course.enrolledStudents}
              </p>
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => router.push(`/courses/${course.id}`)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/courses/${course.id}/edit`)}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
