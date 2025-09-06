import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { articleSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// Get single article
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        images: true,
      }
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Get article error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Check permissions
    if (authUser.role !== 'ADMIN' && article.authorId !== authUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = articleSchema.parse(body);

    // Generate new slug if title changed
    let slug = article.slug;
    if (validatedData.title !== article.title) {
      slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const updatedArticle = await prisma.article.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        slug,
        tags: validatedData.tags,
        publishedAt: validatedData.status === 'PUBLISHED' ? new Date() : article.publishedAt,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        images: true,
      }
    });

    return NextResponse.json({ article: updatedArticle });
  } catch (error) {
    console.error('Update article error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Check permissions
    if (authUser.role !== 'ADMIN' && article.authorId !== authUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.article.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete article error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}