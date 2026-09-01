import { Request, Response, NextFunction } from 'express';
import AngularService from '../services/angular.service';
import { parsePagination, buildPage } from '../helpers/pagination.helper';
import { responseSuccess, responseError } from '../helpers/response.helper';
import { AngularCategory } from '@prisma/client';

export default class AngularController {
  /**
   * List Angular topics (paginated, filterable)
   */
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      const params = parsePagination(req.query);
      const category = req.query.category as AngularCategory | undefined;
      const search = req.query.search as string | undefined;

      const { items, total } = await AngularService.listTopics({
        page: params.page,
        limit: params.limit,
        category,
        search,
      });

      return responseSuccess(
        res,
        200,
        buildPage(items, total, params),
        'Angular topics retrieved successfully',
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get topic by slug
   */
  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const topic = await AngularService.getTopicBySlug(slug);
      return responseSuccess(res, 200, topic, 'Angular topic fetched');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Like a topic
   */
  static async like(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await AngularService.likeTopic(id);
      return responseSuccess(res, 200, updated, 'Topic liked successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create topic
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, slug, description, category, codeSnippet, difficulty } = req.body;
      if (!title || !slug) {
        return responseError(res, 400, 'Title and slug are required');
      }

      const newTopic = await AngularService.createTopic({
        title,
        slug,
        description,
        category: category || AngularCategory.SIGNALS,
        codeSnippet,
        difficulty: difficulty || 'beginner',
      });

      return responseSuccess(res, 201, newTopic, 'Angular topic created successfully');
    } catch (error) {
      next(error);
    }
  }
}
