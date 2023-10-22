import '@/assets/styles/globals.css';

import type { Metadata } from 'next';

import { AuthProvider } from '@/components/providers/auth-provider';
import { LocalProvider } from '@/components/providers/local-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ReduxProvider } from '@/components/providers/redux-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SITE_CONFIG, SITE_THEMES } from '@/configs/site.configs';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s • ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.desc,
  keywords: SITE_CONFIG.keywords,
  authors: [
    {
      name: 'Oleksii Latyshev',
      url: 'https://github.com/EDMIGHT',
    },
  ],
  creator: 'Oleksii Latyshev',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.desc,
    siteName: SITE_CONFIG.name,
    images: [`${SITE_CONFIG.url}/opengraph-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.desc,
    images: [`${SITE_CONFIG.url}/twitter-image.png`],
    creator: '@EDM1GHT',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body
        className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}
      >
        <QueryProvider>
          <ReduxProvider>
            <LocalProvider>
              <AuthProvider>
                <ThemeProvider
                  themes={SITE_THEMES}
                  attribute='class'
                  defaultTheme='system'
                  enableSystem
                >
                  <TooltipProvider>
                    {children}
                    <Toaster />
                    <TailwindIndicator />
                  </TooltipProvider>
                </ThemeProvider>
              </AuthProvider>
            </LocalProvider>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
