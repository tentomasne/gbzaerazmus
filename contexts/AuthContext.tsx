'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export type UserRole = 'EDITOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const user = session?.user ? {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name!,
    role: session.user.role as UserRole,
    image: session.user.image || undefined,
  } : null;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      return result?.ok === true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    signOut({ callbackUrl: '/' });
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    if (role === 'EDITOR') return true; // Both EDITOR and ADMIN can access EDITOR features
    if (role === 'ADMIN') return user.role === 'ADMIN';
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      loading,
      isAuthenticated: !!user,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}