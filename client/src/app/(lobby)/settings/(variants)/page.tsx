import { notFound } from 'next/navigation';

import { DeleteAccountBtn } from '@/components/delete-account-btn';
import { ChangePasswordForm } from '@/components/forms/change-password-form';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getAuthServer } from '@/lib/helpers/getAuthServer';

const Page = async () => {
  const user = await getAuthServer();

  if (!user) {
    return notFound();
  }

  return (
    <div className='space-y-6'>
      <Card variant='transparent' as='section'>
        <CardTitle className='text-xl'>Account</CardTitle>
        <CardDescription>You can change your current account settings</CardDescription>
      </Card>
      <Separator />
      <Card variant='transparent' className='space-y-2' as='section'>
        <CardTitle className='text-xl'>Change password</CardTitle>
        <CardContent className='flex flex-wrap items-center justify-between gap-2  p-0'>
          <ChangePasswordForm />
        </CardContent>
      </Card>
      <Separator />
      <Card variant='transparent' className='space-y-2' as='section'>
        <CardTitle className='text-xl'>Delete Account</CardTitle>
        <CardContent className='flex flex-wrap items-center justify-between gap-2  p-0'>
          <span className='block w-1/2 break-words text-muted-foreground'>
            Permanently delete your account. Once deleted, the data is not recoverable.
            Uploaded chapters will not be deleted with the account.
          </span>
          <DeleteAccountBtn />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
