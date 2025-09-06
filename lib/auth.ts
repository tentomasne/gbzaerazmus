import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getAuthUser(request?: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true, name: true, role: true, image: true }
    });

    return user;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export function requireAuth(roles?: string[]) {
  return async (request?: NextRequest) => {
    const user = await getAuthUser(request);
    
    if (!user) {
      return { error: 'Unauthorized', status: 401 };
    }

    if (roles && !roles.includes(user.role)) {
      return { error: 'Forbidden', status: 403 };
    }

    return { user };
  };
}