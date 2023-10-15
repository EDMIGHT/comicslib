import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ComicAttributes } from '@/components/comic-attributes';
import { ComicCounters } from '@/components/comic-counters';
import { ComicInfo } from '@/components/comic-info';
import { ComicMenu } from '@/components/comic-menu';
import { ComicPageImg } from '@/components/comic-page-img';
import { ShowMoreHoc } from '@/components/hocs/show-more-hoc';
import { NavigationBtns, NavigationVariants } from '@/components/navigation-btns';
import { StatusBadge } from '@/components/status-badge';
import { HREFS } from '@/configs/href.configs';
import { OPENGRAPHS_URLS } from '@/configs/site.configs';
import { absoluteUrl, createTitle } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export const revalidate = 3600; // 1hr

export async function generateStaticParams() {
  const { comics } = await ComicsService.getAll({});

  return comics.map((comic) => ({ id: comic.id }));
}

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const comic = await ComicsService.getById(id);

  if (!comic) {
    return {};
  }

  const ogUrl = new URL(OPENGRAPHS_URLS.comic);
  ogUrl.searchParams.set('comicId', comic.id);

  return {
    title: createTitle(comic.title),
    description: `Page for viewing information about the comic with the title: ${comic.title}`,
    openGraph: {
      title: comic.title,
      description:
        comic.desc ??
        `Page for viewing information about the comic with the title: ${comic.title}`,
      type: 'article',
      url: absoluteUrl(`${HREFS.comics}/${comic.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: comic.title,
        },
      ],
    },
  };
}

const ComicPage: NextPage<PageProps> = async ({ params: { id }, children }) => {
  const comic = await ComicsService.getById(id);

  if (!comic) {
    notFound();
  }

  const {
    img,
    title,
    desc,
    genres,
    authors,
    themes,
    id: comicId,
    status,
    avg_rating,
    comments_count,
    unique_bookmarks_count,
    first_chapter,
    releasedAt,
  } = comic;

  const variants: NavigationVariants[] = [
    {
      title: 'Chapters',
      href: `${HREFS.comics}/${comicId}`,
      searchParams: '',
    },
    {
      title: 'Comments',
      href: `${HREFS.comics}/${comicId}/comments`,
      searchParams: '',
    },
  ];

  return (
    <>
      <div className='absolute left-0 top-0 -z-10 h-[30vh] w-full overflow-hidden '>
        <Image
          src={img}
          alt={title}
          fill
          priority
          sizes='100vw'
          quality={60}
          className='object-cover blur-sm brightness-[.6]'
        />
      </div>
      <div className='flex flex-col gap-2 md:gap-4'>
        <div className='grid grid-cols-[auto_1fr]  items-start gap-2 md:gap-4'>
          <ComicPageImg
            imgSrc={img}
            alt={title}
            className='h-[200px] w-[140px] md:h-[270px] md:w-[210px]'
          />
          <div className='flex h-full flex-col justify-between gap-2'>
            <h1 className='text-3xl font-bold text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
              {title}
            </h1>
            <div className='flex flex-col justify-between gap-6'>
              <h4 className='mt-auto w-[90%] truncate font-medium italic text-white'>
                {comic.authors.map((author) => author.login).join(', ')}
              </h4>
              <ComicMenu
                id={comicId}
                first_chapter={first_chapter}
                className='hidden md:flex'
              />
            </div>
          </div>
        </div>
        <ComicMenu id={comicId} first_chapter={first_chapter} className='flex md:hidden' />
        <div className='space-y-2 xl:hidden'>
          <ComicAttributes genres={genres} themes={themes} />
          <div className='flex gap-2'>
            <StatusBadge status={status.name} variant='transparent' className='text-sm' />
            <ComicCounters
              avg_rating={avg_rating}
              comments_count={comments_count}
              unique_bookmarks_count={unique_bookmarks_count}
            />
          </div>
        </div>

        <p className='hidden text-sm xl:block'>{desc}</p>

        <ShowMoreHoc className='xl:hidden' classNameContent='space-y-2'>
          <p className='text-sm '>{desc}</p>

          <ComicInfo
            genres={genres}
            authors={authors}
            status={status}
            themes={themes}
            releasedAt={releasedAt}
          />
        </ShowMoreHoc>
        <div className='mt-2 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_250px]'>
          <div className='space-y-3'>
            <NavigationBtns variants={variants} />
            {children}
          </div>
          <div className='hidden space-y-4 xl:block'>
            <ComicCounters
              avg_rating={avg_rating}
              comments_count={comments_count}
              unique_bookmarks_count={unique_bookmarks_count}
            />
            <ComicInfo
              genres={genres}
              authors={authors}
              status={status}
              themes={themes}
              releasedAt={releasedAt}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComicPage;
