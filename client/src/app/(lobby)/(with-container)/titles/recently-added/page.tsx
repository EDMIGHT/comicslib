import { Metadata } from 'next';

import { AdvancedFiltering } from '@/components/advanced-filtering';
import { ComicsFeed } from '@/components/feeds/comics-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { TITLES_PAGE_META } from '@/configs/meta.configs';
import { GenresService } from '@/services/genres.service';
import { StatusesService } from '@/services/statuses.service';
import { ThemesService } from '@/services/themes.service';

type PageProps = {
  searchParams: {
    title?: string;
  };
};

export const metadata: Metadata = {
  title: TITLES_PAGE_META.recentlyAdded.title,
  description: TITLES_PAGE_META.recentlyAdded.desc,
};

const Page = async ({ searchParams }: PageProps) => {
  const genres = await GenresService.getAll();
  const statuses = await StatusesService.getAll();
  const themes = await ThemesService.getAll();

  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Recently added</PageHeader>
      <div className='flex flex-wrap items-center gap-2'>
        <Search
          className='min-w-[300px] flex-1'
          initialValue={searchParams.title}
          placeholder='enter name of title..'
          paramsKey='title'
        />
        <AdvancedFiltering genres={genres} statuses={statuses} themes={themes} />
      </div>
      <ComicsFeed {...searchParams} sort='createdAt' order='desc' />
    </div>
  );
};

export default Page;
