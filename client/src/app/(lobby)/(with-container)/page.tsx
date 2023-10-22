import { subDays } from 'date-fns';
import { Metadata } from 'next';
import Link from 'next/link';

import { FullScreenComicCarousel } from '@/components/carousels/full-screen-comic-carousel';
import { SeveralSmallComicsCarousel } from '@/components/carousels/several-small-comics-carousel';
import { LatestUpdatesSection } from '@/components/latest-updates-section';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
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
      <Card variant='transparent' as='section' className='space-y-2'>
        <CardTitle className='text-2xl'>Popular New Titles</CardTitle>
        <FullScreenComicCarousel comics={popularNewComicsCarousel} />
      </Card>
      <Card variant='transparent' as='section' className='space-y-2'>
        <div className='flex items-baseline justify-between gap-2'>
          <CardTitle className='text-2xl'>Latest Updates</CardTitle>
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
      </Card>
      <Card variant='transparent' as='section' className='space-y-2'>
        <div className='flex items-baseline justify-between gap-2'>
          <CardTitle className='text-2xl'>Recently Added</CardTitle>
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
      </Card>
    </div>
  );
};

export default Page;
