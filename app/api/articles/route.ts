import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { articleSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// Get articles with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const country = searchParams.get('country');
    const authorId = searchParams.get('authorId');

    const where: any = {};
    
    if (status) where.status = status;
    if (country) where.country = country;
    if (authorId) where.authorId = authorId;

    const articles = await prisma.article.findMany({
      where,
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        images: true,
        _count: {
          select: { images: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Get articles error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Create new article
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = articleSchema.parse(body);

    // Handle custom publish date for admins
    let customDate = null;
    if (authUser.role === 'ADMIN' && body.publishDate) {
      customDate = new Date(body.publishDate);
    }

    // Generate slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const articleData: any = {
      ...validatedData,
      slug,
      tags: validatedData.tags,
      authorId: authUser.id,
    };

    // Set custom dates if admin provided them
    if (customDate) {
      articleData.createdAt = customDate;
      articleData.updatedAt = customDate;
      if (validatedData.status === 'PUBLISHED') {
        articleData.publishedAt = customDate;
      }
    } else if (validatedData.status === 'PUBLISHED') {
      articleData.publishedAt = new Date();
    }

    const article = await prisma.article.create({
      data: articleData,
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        images: true,
      }
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Create article error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}