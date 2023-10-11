import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FullScreenComicCarousel } from '@/components/carousels/full-screen-comic-carousel';
import { LatestUpdatesSection } from '@/components/latest-updates-section';
import { SectionHeader } from '@/components/section-header';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { formatTimeToNow } from '@/lib/helpers/formatter.helper';
import { cn, combineString } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Main page',
};

const IndexPage = async () => {
  // const recentlyAddedComics = await ComicsService.getAll({
  //   page: 1,
  //   limit: 6,
  //   sort: 'createdAt',
  //   order: 'desc',
  // });
  const { comics: latestUpdatesComics } = await ComicsService.getAll({
    page: 1,
    limit: 24,
    sort: 'updatedAt',
    order: 'desc',
  });
  const popularNewComicsCarousel = await ComicsService.getAll({
    page: 1,
    limit: 10,
    sort: 'best',
    order: 'desc',
    date: 'createdAt',
    startDate: '2023-07-24',
  });

  return (
    <div className='space-y-3'>
      <Card variant='transparent' as='section' className='space-y-2'>
        <CardTitle className='text-2xl'>Popular New Titles</CardTitle>
        <FullScreenComicCarousel comics={popularNewComicsCarousel.comics} />
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
    </div>
  );
};

export default IndexPage;
