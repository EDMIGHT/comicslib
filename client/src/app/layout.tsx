import '@/styles/globals.css';

import type { Metadata } from 'next';

import { QueryProvider } from '@/components/providers/query-provider';
import { ReduxProvider } from '@/components/providers/redux-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body
        className={cn('min-h-screen bg-background font-sans antialiased', fontSans.className)}
      >
        <QueryProvider>
          <ReduxProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
