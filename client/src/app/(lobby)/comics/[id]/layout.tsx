import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

import { ComicCounters } from '@/components/comic-counters';
import { ComicInfo } from '@/components/comic-info';
import { ComicMenu } from '@/components/comic-menu';
import { ComicPageImg } from '@/components/comic-page-img';
import { NavigationBtns, NavigationVariants } from '@/components/navigation-btns';
import { HREFS } from '@/configs/href.configs';
import { SITE_META } from '@/configs/site.configs';
import { absoluteUrl, createTitle } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const { comics } = await ComicsService.getAll({});

  return comics.map((comic) => ({ id: comic.id }));
}

export async function generateMetadata({ params: { id } }: PageProps): Promise<Metadata> {
  const comic = await ComicsService.getById(id);

  if (!comic) {
    return {};
  }

  const ogUrl = new URL(SITE_META.generateOg.comic);
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
    _count,
    avgRating,
    id: comicId,
    status,
    chapters,
    countUniqueSubscribes,
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
    <div className='flex flex-col gap-2 md:gap-4'>
      <div className='grid grid-cols-[auto_1fr]  items-start gap-2 md:gap-4'>
        <ComicPageImg imgSrc={img} alt={title} />
        <div className='flex h-full flex-col justify-between gap-2'>
          <h1 className='text-7xl font-bold'>{title}</h1>
          <ComicMenu comicId={comicId} chapters={chapters} />
        </div>
      </div>
      <div>
        <p className='text-sm '>{desc}</p>
      </div>
      <div className='grid grid-cols-[1fr_250px] gap-4'>
        <div className='flex flex-1 flex-col gap-2'>
          <NavigationBtns variants={variants} />
          {children}
        </div>
        <div className='space-y-4'>
          <ComicCounters
            avgRating={avgRating}
            _count={_count}
            countUniqueSubscribes={countUniqueSubscribes}
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
  );
};

export default ComicPage;
