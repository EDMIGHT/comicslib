import { Metadata } from 'next';

import { SignOutMenu } from '@/components/sign-out-menu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HREFS } from '@/configs/href.configs';
import { AUTH_PAGES_META } from '@/configs/meta.configs';
import { OPENGRAPHS_URLS } from '@/configs/site.configs';
import { absoluteUrl, createTitle } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/require-await
export const generateMetadata = async (): Promise<Metadata> => {
  const { title, desc } = AUTH_PAGES_META.signOut;

  const ogUrl = new URL(OPENGRAPHS_URLS.page);
  ogUrl.searchParams.set('title', title);
  ogUrl.searchParams.set('description', desc);
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: createTitle(title),
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      type: 'website',
      url: absoluteUrl(HREFS.auth.signOut),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
};

const Page = () => {
  return (
    <Card className='flex w-fit flex-col items-center justify-center' variant='transparent'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign Out</CardTitle>
      </CardHeader>
      <CardContent className=''>
        <h3>Are you sure you want to sign out?</h3>
      </CardContent>
      <CardFooter>
        <SignOutMenu />
      </CardFooter>
    </Card>
  );
};

export default Page;
