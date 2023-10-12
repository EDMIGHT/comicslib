import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { CreateFolderForm } from '@/components/forms/create-folder-form';
import { PageHeader } from '@/components/page-header';
import { HREFS } from '@/configs/href.configs';
import { getAuthServer } from '@/lib/getAuthServer';
import { createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Create Folder'),
  description:
    'Personalize your comic book collection with custom folders. Simple and convenient.',
};

const Page = async () => {
  const user = await getAuthServer();

  if (!user) {
    redirect(HREFS.auth.signIn);
  }

  return (
    <div className='space-y-2'>
      <PageHeader>Create Folder</PageHeader>
      <CreateFolderForm />
    </div>
  );
};

export default Page;
