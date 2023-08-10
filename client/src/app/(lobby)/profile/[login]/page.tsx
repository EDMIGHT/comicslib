import { ComicsFeed } from '@/components/comics-feed';
import { ComicsService } from '@/services/comics.service';

type PageProps = {
  params: {
    login: string;
  };
};

// export const fetchCache = 'force-no-store';

const Page = async ({ params: { login } }: PageProps) => {
  // ? как динамически обновлять кэш
  // const { comics } = await ComicsService.getAll({ page: 1, ratedUser: login });

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-3xl font-semibold'>Rated</h2>
      <ComicsFeed ratedUser={login} />
    </div>
  );
};

export default Page;
