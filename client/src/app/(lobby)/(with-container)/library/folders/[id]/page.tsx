import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ComicsFeed } from '@/components/feeds/comics-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { FoldersService } from '@/services/folders.service';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: {
    title?: string;
    sort?: string;
    order?: string;
  };
};

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const folderInfo = await FoldersService.getFolderInfo(id);

  if (!folderInfo) {
    return {};
  }

  return {
    title: `Folder "${folderInfo.title}"`,
    description: `Folder view page with name: ${folderInfo.title}`,
  };
}

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const folderInfo = await FoldersService.getFolderInfo(id);

  if (!folderInfo) {
    notFound();
  }

  return (
    <div className='space-y-2'>
      <PageHeader>Folder &#34;{folderInfo.title}&#34;</PageHeader>
      <div className='flex flex-wrap items-center gap-2'>
        <Search
          className='min-w-[300px] flex-1'
          initialValue={searchParams.title}
          placeholder='enter name of title..'
          paramsKey='title'
        />
        <Sort variants={SORT_VARIANTS.comics} {...searchParams} />
      </div>
      <ComicsFeed folderId={folderInfo.id} {...searchParams} />
    </div>
  );
};

export default Page;
