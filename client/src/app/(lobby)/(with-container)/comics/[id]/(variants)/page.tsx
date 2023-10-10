import { ChaptersSection } from '@/components/chapters-section';
import { ChaptersService } from '@/services/chapters.service';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: {
    sort?: string;
    order?: string;
    page?: string;
    limit?: string;
  };
};

const Page = async ({ params: { id }, searchParams }: PageProps) => {
  const { page, limit, sort, order } = searchParams;

  const response = await ChaptersService.getAll({ comicId: id, limit, page, sort, order });

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
