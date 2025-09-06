'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CookieConsent } from '@/components/CookieConsent';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
        <CookieConsent />
        <Toaster />
      </AuthProvider>
    </SessionProvider>
  );
}