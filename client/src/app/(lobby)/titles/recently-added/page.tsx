import { Metadata } from 'next';

import { AdvancedFiltering } from '@/components/advanced-filtering';
import { ComicsFeed } from '@/components/feeds/comics-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { HREFS } from '@/configs/href.configs';
import { TITLES_PAGE_META } from '@/configs/meta.configs';
import { OPENGRAPHS_URLS } from '@/configs/site.configs';
import { absoluteUrl, createTitle } from '@/lib/utils';
import { GenresService } from '@/services/genres.service';
import { StatusesService } from '@/services/statuses.service';
import { ThemesService } from '@/services/themes.service';

type PageProps = {
  searchParams: {
    title?: string;
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const generateMetadata = async (): Promise<Metadata> => {
  const { title, desc } = TITLES_PAGE_META.recentlyAdded;

  const ogUrl = new URL(OPENGRAPHS_URLS.page);
  ogUrl.searchParams.set('title', title);
  ogUrl.searchParams.set('description', desc);
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: createTitle(title),
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      type: 'website',
      url: absoluteUrl(HREFS.titles.recentlyAdded),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
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
