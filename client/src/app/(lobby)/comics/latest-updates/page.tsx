import { Metadata } from 'next';

import { AdvancedFiltering } from '@/components/advanced-filtering';
import { ComicsFeed } from '@/components/comics-feed';
import { Search } from '@/components/search';
import { BackBtn } from '@/components/ui/back-btn';
import { createTitle } from '@/lib/helpers/general.helper';
import { GenresService } from '@/services/genres.service';
import { StatusesService } from '@/services/statuses.service';

type PageProps = {
  searchParams: {
    title?: string;
  };
};

export const metadata: Metadata = {
  title: createTitle('Latest updates'),
  description:
    'Discover the latest updates in the world of comics. Explore newly updated comics that have just been released or refreshed. Stay current with the freshest content from your favorite comics.',
};

const Page = async ({ searchParams }: PageProps) => {
  const genres = await GenresService.getAll();
  const statuses = await StatusesService.getAll();

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-2 md:gap-4'>
        <BackBtn />
        <h1 className='text-2xl'>Latest updates</h1>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Search className='min-w-[300px] flex-1' initialTitle={searchParams.title} />
        <AdvancedFiltering genres={genres} statuses={statuses} />
      </div>
      <ComicsFeed {...searchParams} sort='updatedAt' order='desc' />
    </div>
  );
};

export default Page;
