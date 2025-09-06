import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser, hashPassword } from '@/lib/auth';
import { userUpdateSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// Update user (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = userUpdateSchema.parse(body);

    // Hash password if provided
    if (validatedData.password) {
      validatedData.password = await hashPassword(validatedData.password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: validatedData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Delete user (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser || authUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Prevent self-deletion
    if (authUser.id === params.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}