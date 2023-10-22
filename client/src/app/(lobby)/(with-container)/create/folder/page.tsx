import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { CreateFolderForm } from '@/components/forms/create-folder-form';
import { PageHeader } from '@/components/page-header';
import { HREFS } from '@/configs/href.configs';
import { CREATE_PAGES_META } from '@/configs/meta.configs';
import { getAuthServer } from '@/lib/getAuthServer';

export const metadata: Metadata = {
  title: CREATE_PAGES_META.folder.title,
  description: CREATE_PAGES_META.folder.desc,
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
