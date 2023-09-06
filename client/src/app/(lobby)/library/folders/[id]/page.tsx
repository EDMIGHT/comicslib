import { notFound } from 'next/navigation';

import { ComicsFeed } from '@/components/feeds/comics-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { SORT_VARIANTS } from '@/configs/site.configs';
import { UserService } from '@/services/users.service';

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

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const folderInfo = await UserService.getFolderInfo(id);

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
      <ComicsFeed folderId={folderInfo.id} />
    </div>
  );
};

export default Page;
