import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { TripleComicCarousel } from '@/components/carousels/triple-comic-carousel';
import { ComicsFeed } from '@/components/comics-feed';
import { PageHeader } from '@/components/page-header';
import { SectionHeader } from '@/components/section-header';
import { buttonVariants } from '@/components/ui/button';
import { capitalizeFirstLetter, cn, createTitle } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  return {
    title: createTitle(capitalizeFirstLetter(decodeURIComponent(slug))),
  };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const topComics = await ComicsService.getAll({
    genres: slug,
    limit: 9,
  });

  if (!topComics) {
    return notFound();
  }

  const capitalizedTitle = capitalizeFirstLetter(decodeURIComponent(slug));

  return (
    <div className='space-y-4'>
      <PageHeader>{capitalizedTitle}</PageHeader>
      <div className='space-y-1'>
        <SectionHeader>Trending this year with genre {capitalizedTitle}</SectionHeader>
        <TripleComicCarousel comics={topComics.comics} />
        <div className='flex w-full items-center justify-center'>
          <Link
            href={`/comics?genre=${slug}`}
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
        <SectionHeader>All comics with genre {capitalizedTitle}</SectionHeader>
        <ComicsFeed genre={[slug]} />
      </div>
    </div>
  );
};

export default Page;
