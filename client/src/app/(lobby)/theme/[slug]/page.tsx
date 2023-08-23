import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ComicsFeed } from '@/components/comics-feed';
import { PageHeader } from '@/components/page-header';
import { SectionHeader } from '@/components/section-header';
import { TopComicsCarousel } from '@/components/top-comics-carousel';
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
    title: createTitle(capitalizeFirstLetter(slug)),
  };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const topComics = await ComicsService.getAll({
    themes: slug,
    limit: 9,
  });

  if (!topComics) {
    return notFound();
  }

  const capitalizedTitle = capitalizeFirstLetter(slug);

  return (
    <div className='space-y-4'>
      <PageHeader>{capitalizedTitle}</PageHeader>
      <div className='space-y-1'>
        <SectionHeader>Trending this year with theme {capitalizedTitle}</SectionHeader>
        <TopComicsCarousel comics={topComics.comics} />
        <div className='flex w-full items-center justify-center'>
          <Link
            href={`/comics?theme=${slug}`}
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
        <SectionHeader>All comics with theme {capitalizedTitle}</SectionHeader>
        <ComicsFeed theme={[slug]} />
      </div>
    </div>
  );
};

export default Page;
