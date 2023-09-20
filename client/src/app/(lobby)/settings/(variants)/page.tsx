import { FC } from 'react';

import { EditItemsPerPageForm } from '@/components/forms/edit-items-per-page-form';
import { ThemeSwitcher } from '@/components/theme-switcher';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
          <ThemeSwitcher />
        </CardContent>
      </Card>
      <Separator />
      <Card variant='transparent' className='space-y-2' as='section'>
        <CardHeader className='space-y-0 p-0'>
          <CardTitle className='text-xl'>Items Per Page</CardTitle>
          <CardDescription>
            Lower values can provide faster data loading on weak internet connections
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-wrap items-center justify-between gap-2  p-0'>
          <EditItemsPerPageForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
