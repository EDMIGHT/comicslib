import { ComicsFeed } from '@/components/feeds/comics-feed';
import { Icons } from '@/components/ui/icons';
import { Formatter } from '@/lib/helpers/formatter.helper';
import { FoldersService } from '@/services/folders.service';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: PageProps) => {
  const folderInfo = await FoldersService.getFolderInfo(id);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold'>{folderInfo.title}</h2>
        <span className='flex items-center text-xl'>
          {Formatter.number(folderInfo._count.comics)}{' '}
          <Icons.bookmark className='fill-foreground' />
        </span>
      </div>
      <div>
        <ComicsFeed folderId={id} className='lg:grid-cols-1' />
      </div>
    </div>
  );
};

export default Page;
