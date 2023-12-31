import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { TripleComicCarousel } from '@/components/carousels/triple-comic-carousel';
import { ComicsFeed } from '@/components/feeds/comics-feed';
import { PageHeader } from '@/components/page-header';
import { SectionHeader } from '@/components/section-header';
import { buttonVariants } from '@/components/ui/button';
import { HREFS } from '@/configs/href.configs';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { ComicsService } from '@/services/comics.service';
import { ThemesService } from '@/services/themes.service';

type PageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600; // 1hr

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const theme = await ThemesService.getByTitle(slug);

  if (!theme) {
    return {};
  }

  return {
    title: capitalizeFirstLetter(theme.title),
    description: `A page with a catalog of comics that have theme ${theme.title}`,
  };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const theme = await ThemesService.getByTitle(slug);

  if (!theme) {
    notFound();
  }

  const topComics = await ComicsService.getAll({
    themes: theme.title,
    limit: 9,
  });

  if (!topComics) {
    return notFound();
  }

  const capitalizedTitle = capitalizeFirstLetter(theme.title);

  return (
    <div className='space-y-4'>
      <PageHeader>{capitalizedTitle}</PageHeader>
      <section className='space-y-1'>
        <SectionHeader>Trending this year with theme {capitalizedTitle}</SectionHeader>
        <TripleComicCarousel comics={topComics.comics} />
        <div className='flex w-full items-center justify-center'>
          <Link
            href={`${HREFS.titles.advancedSearch}?theme=${slug}`}
            className={cn(buttonVariants({ variant: 'link' }))}
          >
            <h3 className='text-center text-xl'>
              Explore <span className='font-semibold'>{capitalizedTitle}</span> Comics –
              Advanced Filters{' '}
            </h3>
          </Link>
        </div>
      </section>
      <section>
        <SectionHeader>All comics with theme {capitalizedTitle}</SectionHeader>
        <ComicsFeed theme={[slug]} />
      </section>
    </div>
  );
};

export default Page;
