import { ChaptersSection } from '@/components/chapters-section';
import { LIMITS } from '@/configs/site.configs';
import { ChaptersService } from '@/services/chapters.service';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
};

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const page = searchParams['page'] ?? '1';
  const limit = searchParams['limit'] ?? LIMITS.chapters;

  const response = await ChaptersService.getAll({ comicId: id, limit, page });

  return (
    <div className='flex flex-col gap-2'>
      {response.chapters.length > 0 ? (
        <ChaptersSection {...response} />
      ) : (
        <div className='flex h-[30vh] w-full items-center justify-center'>
          <h3 className='text-xl font-medium'>No chapters uploaded</h3>
        </div>
      )}
    </div>
  );
};

export default Page;
