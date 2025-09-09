'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { I18nProvider } from '@/components/I18nProvider';
import { CookieConsent } from '@/components/CookieConsent';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <I18nProvider>
        <AuthProvider>
          {children}
          <CookieConsent />
          <Toaster />
        </AuthProvider>
      </I18nProvider>
    </SessionProvider>
  );
}