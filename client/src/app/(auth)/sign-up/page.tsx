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
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: AUTH_PAGES_META.signUp.title,
  description: AUTH_PAGES_META.signUp.desc,
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
