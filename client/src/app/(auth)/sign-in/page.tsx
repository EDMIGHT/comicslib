import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { SignInForm } from '@/components/forms/sign-in-form';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Page for user authorization',
};

const SignInPage: NextPage = () => {
  return (
    <Card className='w-[400px]' variant='transparent'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <CardDescription>
          Don&apos;t have an account?{' '}
          <Link href='/signUp' className={cn(buttonVariants({ variant: 'link' }), 'p-0')}>
            Sign up
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
