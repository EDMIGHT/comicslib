import Link from 'next/link';
import { FC } from 'react';

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

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
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
