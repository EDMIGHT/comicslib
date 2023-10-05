'use client';

import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { HREFS } from '@/configs/href.configs';
import { TITLES_PAGE_META } from '@/configs/meta.configs';
import { OPENGRAPHS_URLS } from '@/configs/site.configs';
import { absoluteUrl, createTitle } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

// eslint-disable-next-line @typescript-eslint/require-await
export const generateMetadata = async (): Promise<Metadata> => {
  const { title, desc } = TITLES_PAGE_META.random;

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
      url: absoluteUrl(HREFS.titles.random),
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

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectToRandomComic = async () => {
      const { randomId } = await ComicsService.getRandomId();
      router.replace(`${HREFS.comics}/${randomId}`);
    };

    void redirectToRandomComic();
  }, [router]);

  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <div className='flex gap-2 md:gap-4'>
        <Skeleton className='h-[180px] w-[140px] shrink-0 rounded sm:h-[220px] sm:w-[180px] md:h-[250px] md:w-[210px]' />
        <div className='flex w-full flex-col gap-2'>
          <Skeleton className='h-[3rem] w-[80%]' />

          <div className='mt-auto hidden space-y-2 xl:block'>
            <Skeleton className='h-[30px] w-[200px]' />

            <div className='flex gap-2'>
              <Skeleton className='h-[50px] w-[150px]' />
              <Skeleton className='h-[50px] w-[150px]' />
              <Skeleton className='h-[50px] w-[150px]' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-2'>
        <Skeleton className='h-[40px] w-full lg:w-[150px]' />
        <Skeleton className='h-[40px] w-[150px]' />
        <Skeleton className='h-[40px] w-12 lg:w-[150px]' />
      </div>

      <div>
        <Skeleton className='h-[100px] w-full' />
      </div>
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <Skeleton className='h-10 w-[150px]' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='hidden w-[250px] flex-col gap-2 xl:flex'>
          <Skeleton className='h-10 w-[200px]' />
          <div className='flex items-center gap-1'>
            <h2 className='text-xl font-semibold'>Status:</h2>
            <Skeleton className='h-5 w-[120px]' />
          </div>
          <div>
            <h2 className='text-xl font-semibold'>Authors:</h2>
            <ul className='flex flex-wrap gap-1'>
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[120px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[100px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[80px]' />
            </ul>
          </div>
          <div>
            <h2 className='text-xl font-semibold'>Genres:</h2>
            <ul className='flex flex-wrap gap-1'>
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[120px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[100px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[80px]' />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
