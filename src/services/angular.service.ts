import AngularRepository from '../repositories/angular.repository';
import { AngularCategory } from '@prisma/client';

export default class AngularService {
  static async listTopics(params: {
    page: number;
    limit: number;
    category?: AngularCategory;
    search?: string;
  }) {
    return AngularRepository.findAll(params);
  }

  static async getTopicBySlug(slug: string) {
    const topic = await AngularRepository.findBySlug(slug);
    if (!topic) {
      throw { status: 404, message: 'Angular topic not found' };
    }
    return topic;
  }

  static async likeTopic(id: string) {
    return AngularRepository.like(id);
  }

  static async createTopic(data: any) {
    return AngularRepository.create(data);
  }
}
