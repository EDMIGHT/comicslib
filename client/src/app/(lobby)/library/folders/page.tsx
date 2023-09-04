import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { Folder } from '@/components/layouts/folder';
import { PageHeader } from '@/components/page-header';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { UserService } from '@/services/users.service';
import { ISortArg } from '@/types/response.types';

export const metadata: Metadata = {
  title: 'Your folders',
  description:
    'User folders and the comics they have saved: an organized repository of comics that interest you',
};

type PageProps = {
  searchParams: ISortArg & {
    title?: string;
  };
};

const Page = async ({ searchParams }: PageProps) => {
  const user = await getAuthServer();
  if (!user) {
    return notFound();
  }

  const folders = await UserService.getAllUserFolders({ ...searchParams });

  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Your folders</PageHeader>
      {folders.length > 0 ? (
        <ul className='space-y-2'>
          {folders.map((folder) => (
            <li key={folder.id}>
              <Folder {...folder} />
            </li>
          ))}
        </ul>
      ) : (
        <div>no found</div>
      )}
    </div>
  );
};

export default Page;
