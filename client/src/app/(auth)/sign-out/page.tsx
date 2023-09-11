import { Metadata } from 'next';

import { SignOutMenu } from '@/components/sign-out-menu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Sign Out'),
  description: 'Page for a user to log out of their account',
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
