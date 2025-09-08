import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const announcementSchema = z.object({
  text: z.string().min(1, 'Text is required').max(500, 'Text must be less than 500 characters'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
  isActive: z.boolean(),
});

// Get active announcement
export async function GET() {
  try {
    const announcement = await prisma.announcement.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error('Get announcement error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Create or update announcement (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = announcementSchema.parse(body);

    // Deactivate all existing announcements
    await prisma.announcement.updateMany({
      data: { isActive: false }
    });

    // Create new announcement
    const announcement = await prisma.announcement.create({
      data: validatedData
    });

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error('Create announcement error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Update announcement (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;
    const validatedData = announcementSchema.parse(updateData);

    const announcement = await prisma.announcement.update({
      where: { id },
      data: validatedData
    });

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error('Update announcement error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}