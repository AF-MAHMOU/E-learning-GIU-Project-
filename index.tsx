import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { quizzesService } from '../../services';
import { useAuth } from '../../hooks/useAuth';

interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  totalQuestions: number;
  createdAt: string;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await quizzesService.getAllQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleCreateQuiz = () => {
    router.push('/quizzes/create');
  };

  const handleStartQuiz = (quizId: string) => {
    router.push(`/quizzes/${quizId}`);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quizzes</h1>
        {user?.role === 'instructor' && (
          <button
            onClick={handleCreateQuiz}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Quiz
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>Questions: {quiz.totalQuestions}</span>
              <span>Time: {quiz.timeLimit} minutes</span>
            </div>
            <button
              onClick={() => handleStartQuiz(quiz.id)}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Start Quiz
            </button>
          </div>
        ))}
        {quizzes.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No quizzes available</p>
        )}
      </div>
    </div>
  );
}