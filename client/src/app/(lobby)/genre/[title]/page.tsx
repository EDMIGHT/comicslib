import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ComicsFeed } from '@/components/comics-feed';
import { PageHeader } from '@/components/page-header';
import { SectionHeader } from '@/components/section-header';
import { TopComics } from '@/components/top-comics';
import { buttonVariants } from '@/components/ui/button';
import { capitalizeFirstLetter, cn, createTitle } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    title: string;
  };
};

export async function generateMetadata({ params: { title } }: PageProps): Promise<Metadata> {
  return {
    title: createTitle(capitalizeFirstLetter(title)),
  };
}

const Page = async ({ params: { title } }: PageProps) => {
  const topComics = await ComicsService.getAll({
    genres: title,
    limit: 9,
  });

  if (!topComics) {
    return notFound();
  }

  const capitalizedTitle = capitalizeFirstLetter(title!);

  return (
    <div className='space-y-4'>
      <PageHeader>{capitalizedTitle}</PageHeader>
      <div className='space-y-1'>
        <SectionHeader>Trending this year with genre {capitalizedTitle}</SectionHeader>
        <TopComics comics={topComics.comics} />
        <div className='flex w-full items-center justify-center'>
          <Link
            href='/comics?genre=adventure'
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
        <ComicsFeed genre={[title]} />
      </div>
    </div>
  );
};

export default Page;
