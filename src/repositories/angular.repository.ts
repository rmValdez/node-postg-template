import { prisma } from '../utils/prisma';
import { AngularCategory } from '@prisma/client';

export default class AngularRepository {
  /**
   * List all topics with pagination and category filter
   */
  static async findAll(params: {
    page: number;
    limit: number;
    tenantId?: string;
    category?: AngularCategory;
    search?: string;
  }) {
    const { page, limit, tenantId, category, search } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (tenantId) {
      where.tenantId = tenantId;
    }
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.angularTopic.findMany({
        where,
        skip,
        take: limit,
        orderBy: { likesCount: 'desc' },
        include: {
          author: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      }),
      prisma.angularTopic.count({ where }),
    ]);

    return { items, total };
  }

  /**
   * Find topic by slug
   */
  static async findBySlug(slug: string) {
    return prisma.angularTopic.findUnique({
      where: { slug },
      include: {
        author: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });
  }

  /**
   * Increment likes on a topic
   */
  static async like(id: string) {
    return prisma.angularTopic.update({
      where: { id },
      data: {
        likesCount: { increment: 1 },
      },
    });
  }

  /**
   * Create new Angular topic
   */
  static async create(data: any) {
    return prisma.angularTopic.create({
      data,
    });
  }
}
