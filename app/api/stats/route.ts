import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalUsers,
      totalArticles,
      publishedArticles,
      pendingArticles,
      totalImages,
      recentArticles
    ] = await Promise.all([
      prisma.user.count(),
      prisma.article.count(),
      prisma.article.count({ where: { status: 'PUBLISHED' } }),
      prisma.article.count({ where: { status: 'PENDING' } }),
      prisma.image.count(),
      prisma.article.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { name: true }
          }
        }
      })
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalArticles,
        publishedArticles,
        pendingArticles,
        totalImages,
        recentArticles
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}