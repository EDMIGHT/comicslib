import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { TripleComicCarousel } from '@/components/carousels/triple-comic-carousel';
import { ComicsFeed } from '@/components/feeds/comics-feed';
import { PageHeader } from '@/components/page-header';
import { SectionHeader } from '@/components/section-header';
import { buttonVariants } from '@/components/ui/button';
import { HREFS } from '@/configs/href.configs';
import { cn, createTitle } from '@/lib/utils';
import { AuthorsService } from '@/services/authors.service';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600; // 1hr

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const existedAuthor = await AuthorsService.get(slug);

  if (!existedAuthor) {
    return {};
  }

  return {
    title: createTitle(existedAuthor.login),
  };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const author = await AuthorsService.get(slug);

  if (!author) {
    notFound();
  }

  const lastWorks = await ComicsService.getAll({
    authors: slug,
    limit: 9,
    sort: 'createdAt',
    order: 'desc',
  });

  return (
    <div className='space-y-4'>
      <PageHeader>{author.login}</PageHeader>
      {lastWorks.comics.length > 1 ? (
        <>
          <section className='space-y-1'>
            <SectionHeader>Recent works {author.login}</SectionHeader>
            <TripleComicCarousel comics={lastWorks.comics} />
            <div className='flex w-full items-center justify-center'>
              <Link
                href={`${HREFS.titles.advancedSearch}?author=${slug}`}
                className={cn(buttonVariants({ variant: 'link' }))}
              >
                <h3 className='text-center text-xl'>
                  Explore comics by author{' '}
                  <span className='font-semibold'>{author.login}</span> – Advanced Filters
                </h3>
              </Link>
            </div>
          </section>
          <section>
            <SectionHeader>All works by the author {author.login}</SectionHeader>
            <ComicsFeed author={[slug]} />
          </section>
        </>
      ) : (
        <div>This author has no works</div>
      )}
    </div>
  );
};

export default Page;
