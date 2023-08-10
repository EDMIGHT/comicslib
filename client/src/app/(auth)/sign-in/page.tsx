import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import { SignInForm } from '@/components/forms/sign-in-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Page for user authorization',
};

const SignInPage: NextPage = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-2'>
      <Card className='w-[400px]'>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter>
          <CardDescription>
            Don&apos;t have an account?{' '}
            <Link href='/signUp' className='text-primary'>
              Sign up
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
