import { Metadata } from 'next';

import { ComicsWithChaptersFeed } from '@/components/feeds/comics-with-chapters-feed';
import { PageHeader } from '@/components/page-header';
import { Search } from '@/components/search';
import { Sort } from '@/components/sort';
import { HREFS } from '@/configs/href.configs';
import { TITLES_PAGE_META } from '@/configs/meta.configs';
import { OPENGRAPHS_URLS, SORT_VARIANTS } from '@/configs/site.configs';
import { absoluteUrl, createTitle } from '@/lib/utils';

type PageProps = {
  searchParams: {
    title?: string;
    sort?: string;
    order?: string;
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const generateMetadata = async (): Promise<Metadata> => {
  const { title, desc } = TITLES_PAGE_META.latestUpdaters;

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
      url: absoluteUrl(HREFS.titles.latestUpdates),
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

const Page = ({ searchParams }: PageProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Latest updates</PageHeader>
      <div className='flex flex-col gap-2 md:flex-row'>
        <Search
          initialValue={searchParams.title}
          placeholder='enter title name..'
          paramsKey='title'
          className='min-w-[300px] flex-1'
        />
        <Sort
          initialSort={searchParams.sort}
          initialOrder={searchParams.order}
          variants={SORT_VARIANTS.comicsWithChapters}
          defaultVariantNumber={4}
          contentWidth='230px'
          className='w-[230px]'
        />
      </div>

      <ComicsWithChaptersFeed {...searchParams} />
    </div>
  );
};

export default Page;
