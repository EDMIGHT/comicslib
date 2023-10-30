import { subDays } from 'date-fns';
import { Metadata } from 'next';
import Link from 'next/link';

import { FullScreenComicCarousel } from '@/components/carousels/full-screen-comic-carousel';
import { SeveralSmallComicsCarousel } from '@/components/carousels/several-small-comics-carousel';
import { LatestUpdatesSection } from '@/components/latest-updates-section';
import { SectionHeader } from '@/components/section-header';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { HOME_PAGE_META } from '@/configs/meta.configs';
import { Formatter } from '@/lib/helpers/formatter.helper';
import { cn } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

export const metadata: Metadata = {
  title: HOME_PAGE_META.title,
  description: HOME_PAGE_META.desc,
};

const Page = async () => {
  const today = new Date();
  const dateFewDaysAgo = subDays(today, 120);

  const { comics: recentlyAddedComics } = await ComicsService.getAll({
    limit: 30,
    sort: 'createdAt',
    order: 'desc',
  });
  const { comics: latestUpdatesComics } = await ComicsService.getAllWithChapters({
    limit: 24,
    sort: 'updatedAt',
    order: 'desc',
  });
  const { comics: popularNewComicsCarousel } = await ComicsService.getAll({
    limit: 10,
    sort: 'best',
    order: 'desc',
    date: 'createdAt',
    startDate: Formatter.timeForRequest(dateFewDaysAgo),
  });

  return (
    <div className='space-y-3'>
      <section className='space-y-2'>
        <SectionHeader>Popular New Titles</SectionHeader>
        <FullScreenComicCarousel comics={popularNewComicsCarousel} />
      </section>
      <section className='space-y-2'>
        <div className='flex items-baseline justify-between gap-2'>
          <SectionHeader>Latest Updates</SectionHeader>
          <Link
            href={HREFS.titles.latestUpdates}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'rounded-full w-fit h-fit p-2'
            )}
          >
            <Icons.arrowRight />
          </Link>
        </div>
        <LatestUpdatesSection comics={latestUpdatesComics} />
      </section>
      <section className='space-y-2'>
        <div className='flex items-baseline justify-between gap-2'>
          <SectionHeader>Recently Added</SectionHeader>
          <Link
            href={HREFS.titles.recentlyAdded}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'rounded-full w-fit h-fit p-2'
            )}
          >
            <Icons.arrowRight />
          </Link>
        </div>
        <SeveralSmallComicsCarousel comics={recentlyAddedComics} />
      </section>
    </div>
  );
};

export default Page;
