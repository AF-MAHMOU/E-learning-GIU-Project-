import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { QuestionBank, QuestionBankDocument } from '../schemas/questionBank.schema';
import { Response, ResponseDocument } from '../schemas/response.schema';
import { SubmitQuizDto } from '../dto/submit-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
    @InjectModel(QuestionBank.name) private readonly questionBankModel: Model<QuestionBankDocument>,
    @InjectModel(Response.name) private readonly responseModel: Model<ResponseDocument>,
  ) {}

  //Create a new quiz.
  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    // Fetch the question bank for the given module.
    const questionBank = await this.questionBankModel.findOne({ moduleId: createQuizDto.moduleId });
    if (!questionBank) {
      throw new NotFoundException('Question bank not found. Create a question bank for this module first.');
    }

    const selectedQuestions: string[] = [];
    
    // Validate and select questions based on difficulty criteria.
    for (const criteria of createQuizDto.questionSelectionCriteria) {
      const difficultyGroup = questionBank.questionsByDifficulty.find(
        (group) => group.difficulty === criteria.difficulty,
      );

      if (!difficultyGroup || difficultyGroup.questions.length < criteria.numberOfQuestions) {
        throw new NotFoundException(`Not enough questions available for difficulty: ${criteria.difficulty}`);
      }

      // Select the required number of questions.
      selectedQuestions.push(...difficultyGroup.questions.slice(0, criteria.numberOfQuestions));
    }

    // Create a new quiz with the selected questions.
    const quiz = new this.quizModel({
      quizId: `quiz_${Date.now()}`, // Generate unique quiz ID.
      ...createQuizDto,
      questions: selectedQuestions,
      createdAt: new Date(),
    });

    return quiz.save();
  }

  //Retrieve a quiz by its ID.
  async getQuiz(quizId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  //Submit a quiz and calculate the score.
  async submitQuiz(submitQuizDto: SubmitQuizDto): Promise<Response> {
    const { quizId, userId, answers } = submitQuizDto;

    // Fetch the quiz and populate question details.
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const questionBank = await this.questionBankModel.findOne({ moduleId: quiz.moduleId });
    if (!questionBank) {
      throw new NotFoundException('Question bank not found for the quiz');
    }

    let score = 0;
    const detailedFeedback = [];

    for (const questionId of quiz.questions) {
      // Retrieve question details from the question bank.
      const questionGroup = questionBank.questionsByDifficulty.find(group =>
        group.questions.includes(questionId),
      );
      if (!questionGroup) continue;

      // Find the submitted answer for the current question.
      const submittedAnswer = answers.find((a) => a.questionId === questionId);

      if (submittedAnswer) {
        // Check if the answer is correct (this assumes `correctAnswer` exists in the question details).
        const isCorrect = submittedAnswer.selectedOptions.includes('correctOption'); // Placeholder logic
        if (isCorrect) score++;
        detailedFeedback.push({ questionId, isCorrect });
      }
    }

    // Save the response with detailed feedback and score.
    const response = new this.responseModel({
      quizId,
      userId,
      answers,
      score,
      detailedFeedback,
      submittedAt: new Date(),
    });

    return response.save();
  }

  // Retrieve all quizzes.
  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  // Retrieve quizzes created by an instructor.
  async getQuizzesByInstructor(instructorId: string): Promise<Quiz[]> {
    return this.quizModel.find({ createdBy: instructorId }).exec();
  }
  
  // Updating quiz
  async updateQuiz(quizId: string, updateData: Partial<Quiz>): Promise<Quiz> {
    const updatedQuiz = await this.quizModel.findByIdAndUpdate(quizId, updateData, { new: true }).exec();
    if (!updatedQuiz) throw new NotFoundException('Quiz not found');
    return updatedQuiz;
  }
  
  // Deleting the Quiz
  async deleteQuiz(quizId: string): Promise<void> {
    const result = await this.quizModel.findByIdAndDelete(quizId).exec();
    if (!result) throw new NotFoundException('Quiz not found');
  }

}
