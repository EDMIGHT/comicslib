import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { EditFolderForm } from '@/components/forms/edit-folder-form';
import { PageHeader } from '@/components/page-header';
import { ComicsService } from '@/services/comics.service';
import { FoldersService } from '@/services/folders.service';
import { IPaginationArg } from '@/types/response.types';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: IPaginationArg;
};

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const folderInfo = await FoldersService.getFolderInfo(id);

  if (!folderInfo) {
    return {};
  }

  return {
    title: `Edit folder "${folderInfo.title}"`,
    description: `Page for editing a folder with the name: ${folderInfo.title}`,
  };
}

const Page: FC<PageProps> = async ({ params: { id }, searchParams }) => {
  const folder = await FoldersService.getFolderInfo(id);

  if (!folder) {
    notFound();
  }

  const comics = await ComicsService.getAll({
    ...searchParams,
    folderId: folder.id,
  });

  return (
    <div className='space-y-2'>
      <PageHeader>Edit folder &#34;{folder.title}&#34;</PageHeader>
      <EditFolderForm folder={folder} responseComics={comics} />
    </div>
  );
};

export default Page;
