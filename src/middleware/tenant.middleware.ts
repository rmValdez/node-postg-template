import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';

export interface TenantRequest extends Request {
  tenant?: {
    id: string;
    slug: string;
    name: string;
  };
}

/**
 * ============================================================================
 * MULTI-TENANT RESOLUTION MIDDLEWARE
 * ============================================================================
 *
 * Extracts tenant identifier from:
 * 1. Header: `x-tenant-id` (e.g. "angular-v4", "next-v1", "vue-v3")
 * 2. Query param: `?tenant=angular-v4`
 * 3. Default: Fallback to "angular-v4" in development
 */
export async function tenantMiddleware(req: TenantRequest, res: Response, next: NextFunction) {
  try {
    const rawTenantSlug =
      (req.headers['x-tenant-id'] as string) ||
      (req.query.tenantId as string) ||
      (req.query.tenant as string) ||
      'angular-v4'; // Default fallback

    const tenant = await prisma.tenant.findUnique({
      where: { slug: rawTenantSlug },
      select: { id: true, slug: true, name: true, isActive: true },
    });

    if (tenant && tenant.isActive) {
      req.tenant = {
        id: tenant.id,
        slug: tenant.slug,
        name: tenant.name,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
}
