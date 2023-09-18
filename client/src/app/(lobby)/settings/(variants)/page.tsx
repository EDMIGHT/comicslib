import { FC } from 'react';

import { ThemeSwitcherForm } from '@/components/theme-switcher';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Page: FC = () => {
  return (
    <div className='space-y-6'>
      <Card variant='transparent' as='section'>
        <CardTitle className='text-xl'>Appearance</CardTitle>
        <CardDescription> Customize the appearance of the app.</CardDescription>
      </Card>
      <Separator />
      <Card variant='transparent' className='space-y-2' as='section'>
        <CardTitle className='text-xl'>Theme</CardTitle>
        <CardContent className='flex flex-wrap items-center justify-between gap-2  p-0'>
          <ThemeSwitcherForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
