import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { TripleComicCarousel } from '@/components/carousels/triple-comic-carousel';
import { ComicsFeed } from '@/components/feeds/comics-feed';
import { PageHeader } from '@/components/page-header';
import { SectionHeader } from '@/components/section-header';
import { buttonVariants } from '@/components/ui/button';
import { HREFS } from '@/configs/href.configs';
import { capitalizeFirstLetter, cn, createTitle } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';
import { StatusesService } from '@/services/statuses.service';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const status = await StatusesService.getByName(slug);

  if (!status) {
    return {};
  }

  return {
    title: createTitle(capitalizeFirstLetter(status.name)),
  };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const status = await StatusesService.getByName(slug);

  if (!status) {
    notFound();
  }

  const topComics = await ComicsService.getAll({
    statuses: status.name,
    limit: 9,
  });

  if (!topComics) {
    return notFound();
  }

  const capitalizedTitle = capitalizeFirstLetter(status.name);

  return (
    <div className='space-y-4'>
      <PageHeader>{capitalizedTitle}</PageHeader>
      <div className='space-y-1'>
        <SectionHeader>Trending this year with status {capitalizedTitle}</SectionHeader>
        <TripleComicCarousel comics={topComics.comics} />
        <div className='flex w-full items-center justify-center'>
          <Link
            href={`${HREFS.titles.advancedSearch}?status=${slug}`}
            className={cn(buttonVariants({ variant: 'link' }))}
          >
            <h3 className='text-center text-xl'>
              Explore <span className='font-semibold'>{capitalizedTitle}</span> Comics –
              Advanced Filters{' '}
            </h3>
          </Link>
        </div>
      </div>
      <div>
        <SectionHeader>All comics with status {capitalizedTitle}</SectionHeader>
        <ComicsFeed status={[slug]} />
      </div>
    </div>
  );
};

export default Page;
