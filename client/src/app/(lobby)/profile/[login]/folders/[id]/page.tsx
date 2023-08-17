import { FC } from 'react';

import { ComicsFeed } from '@/components/comics-feed';
import { ComicsList } from '@/components/comics-list';
import { Icons } from '@/components/ui/icons';
import { ComicsService } from '@/services/comics.service';
import { UserService } from '@/services/users.service';

type PageProps = {
  params: {
    login: string;
    id: string;
  };
};

const Page = async ({ params: { id, login } }: PageProps) => {
  const folderInfo = await UserService.getUserFolderInfo(login, id);

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
