import { ComicsFeed } from '@/components/feeds/comics-feed';
import { Icons } from '@/components/ui/icons';
import { UserService } from '@/services/users.service';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: PageProps) => {
  const folderInfo = await UserService.getFolderInfo(id);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold'>{folderInfo.title}</h2>
        <span className='flex items-center text-xl'>
          {folderInfo._count.comics} <Icons.bookmark className='fill-foreground' />
        </span>
      </div>
      <div>
        <ComicsFeed folderId={id} />
      </div>
    </div>
  );
};

export default Page;
