import api from '../utils/api';

export const quizzesService = {
  getAllQuizzes: async () => {
    const response = await api.get('/quizzes');
    return response.data;
  },

  getQuizById: async (id: string) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  createQuiz: async (quizData: any) => {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  },

  updateQuiz: async (id: string, quizData: any) => {
    const response = await api.patch(`/quizzes/${id}`, quizData);
    return response.data;
  },

  deleteQuiz: async (id: string) => {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  },

  submitQuiz: async (quizId: string, answers: any) => {
    const response = await api.post(`/quizzes/${quizId}/submit`, answers);
    return response.data;
  },

  // Question Bank endpoints
  getQuestionBank: async () => {
    const response = await api.get('/question-banks');
    return response.data;
  },

  addQuestionToBank: async (questionData: any) => {
    const response = await api.post('/question-banks', questionData);
    return response.data;
  }
};
