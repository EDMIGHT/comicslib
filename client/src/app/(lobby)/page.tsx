import { Metadata } from 'next';

import { FullScreenComicCarousel } from '@/components/carousels/full-screen-comic-carousel';
import { SectionHeader } from '@/components/section-header';
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
  // const latestUpdatesComics = await ComicsService.getAll({
  //   page: 1,
  //   limit: 6,
  //   sort: 'updatedAt',
  //   order: 'desc',
  // });
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
      <section>
        <SectionHeader>Popular New Titles</SectionHeader>
        <FullScreenComicCarousel comics={popularNewComicsCarousel.comics} />
      </section>
    </div>
  );
};

export default IndexPage;
