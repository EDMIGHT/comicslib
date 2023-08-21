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
    name: string;
  };
};

export async function generateMetadata({ params: { name } }: PageProps): Promise<Metadata> {
  return {
    title: createTitle(capitalizeFirstLetter(name)),
  };
}

const Page = async ({ params: { name } }: PageProps) => {
  const topComics = await ComicsService.getAll({
    statuses: name,
    limit: 9,
  });

  if (!topComics) {
    return notFound();
  }

  const capitalizedTitle = capitalizeFirstLetter(name);

  return (
    <div className='space-y-4'>
      <PageHeader>{capitalizedTitle}</PageHeader>
      <div className='space-y-1'>
        <SectionHeader>Trending this year with status {capitalizedTitle}</SectionHeader>
        <TopComics comics={topComics.comics} />
        <div className='flex w-full items-center justify-center'>
          <Link
            href={`/comics?status=${name}`}
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
        <ComicsFeed status={[name]} />
      </div>
    </div>
  );
};

export default Page;
