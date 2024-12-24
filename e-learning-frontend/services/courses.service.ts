import api from '../utils/api';

export const coursesService = {
  getAllCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },

  getCourseById: async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData: any) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (id: string, courseData: any) => {
    const response = await api.patch(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  enrollInCourse: async (courseId: string) => {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  },

  getEnrolledCourses: async (userId: string) => {
    const response = await api.get(`/users/${userId}/enrolled-courses`);
    return response.data;
  }
};
