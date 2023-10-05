import { Metadata } from 'next';
import Link from 'next/link';

import { SignUpForm } from '@/components/forms/sign-up-form';
import { OAuthSignIn } from '@/components/oauth-sign-in';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { HREFS } from '@/configs/href.configs';
import { AUTH_PAGES_META } from '@/configs/meta.configs';
import { OPENGRAPHS_URLS } from '@/configs/site.configs';
import { absoluteUrl, cn, createTitle } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/require-await
export const generateMetadata = async (): Promise<Metadata> => {
  const { title, desc } = AUTH_PAGES_META.signUp;

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
      url: absoluteUrl(HREFS.auth.signUp),
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
    <Card className='w-[400px]' variant='transparent'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign Up</CardTitle>
        <CardDescription>Choose your preferred sign up method</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <OAuthSignIn />
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <Separator />
          </div>
          <div className='relative flex justify-center'>
            <span className='bg-background px-2 text-xs uppercase text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <CardDescription>
          Already have an account?{' '}
          <Link
            href={HREFS.auth.signIn}
            className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
          >
            Sign in
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default Page;
