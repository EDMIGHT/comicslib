import { Metadata } from 'next';
import Link from 'next/link';

import { SignUpForm } from '@/components/forms/sign-up-form';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Page for user registration',
};

const Page = () => {
  return (
    <Card className='w-[400px]' variant='transparent'>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
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
