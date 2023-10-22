import { Metadata } from 'next';

import { SignOutMenu } from '@/components/sign-out-menu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AUTH_PAGES_META } from '@/configs/meta.configs';

export const metadata: Metadata = {
  title: AUTH_PAGES_META.signOut.title,
  description: AUTH_PAGES_META.signOut.desc,
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
