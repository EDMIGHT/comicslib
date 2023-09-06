import { notFound } from 'next/navigation';
import { FC } from 'react';

import { EditFolderForm } from '@/components/forms/edit-folder-form';
import { PageHeader } from '@/components/page-header';
import { ComicsService } from '@/services/comics.service';
import { UserService } from '@/services/users.service';
import { IPaginationArg } from '@/types/response.types';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: IPaginationArg;
};

const Page: FC<PageProps> = async ({ params: { id }, searchParams }) => {
  const folder = await UserService.getFolderInfo(id);

  if (!folder) {
    notFound();
  }

  const comics = await ComicsService.getAll({ ...searchParams, folderId: folder.id });

  return (
    <div>
      <PageHeader>Edit folder &#34;{folder.title}&#34;</PageHeader>
      <EditFolderForm folder={folder} responseComics={comics} />
    </div>
  );
};

export default Page;
