import QuizRepository from '../repositories/quiz.repository';

export default class QuizService {
  static async getQuestions(options?: {
    tenantId?: string;
    category?: string;
    difficulty?: string;
    search?: string;
    limit?: number;
  }) {
    const items = await QuizRepository.findAll(options);
    return {
      items,
      total: items.length,
    };
  }

  static async getQuestionById(id: number) {
    return QuizRepository.findById(id);
  }

  static async getProgress(options: { tenantId?: string; sessionId: string; userId?: string }) {
    return QuizRepository.getProgress(options);
  }

  static async saveProgress(options: {
    tenantId?: string;
    sessionId: string;
    userId?: string;
    answers: any;
    score: number;
    answeredCount: number;
  }) {
    return QuizRepository.saveProgress(options);
  }

  static async resetProgress(options: { tenantId?: string; sessionId: string; userId?: string }) {
    return QuizRepository.resetProgress(options);
  }
}
