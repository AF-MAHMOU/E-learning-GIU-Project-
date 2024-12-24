import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { quizzesService } from '../../services';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id || Array.isArray(id)) return;
      
      try {
        const data = await quizzesService.getQuizById(id);
        setQuiz(data);
        setTimeLeft(data.timeLimit * 60); // Convert minutes to seconds
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const handleSubmit = useCallback(async () => {
    if (!quiz || !id || Array.isArray(id)) return;

    try {
      await quizzesService.submitQuiz(id, { answers });
      setQuizSubmitted(true);
      router.push('/quizzes'); // Redirect to quizzes page after submission
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  }, [quiz, id, answers, router]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || quizSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizSubmitted, handleSubmit]);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!quiz) {
    return <div className="text-center py-8">Quiz not found</div>;
  }

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <div className="text-lg font-semibold">
            Time Left: {Math.floor(timeLeft! / 60)}:{(timeLeft! % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <span className="text-gray-600">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-4">{currentQuestionData.text}</h2>
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-3 rounded-lg ${
                  answers[currentQuestion] === index
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                } border transition-colors`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;