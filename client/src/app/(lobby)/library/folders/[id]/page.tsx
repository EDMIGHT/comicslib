import { notFound } from 'next/navigation';

import { ComicsFeed } from '@/components/feeds/comics-feed';
import { PageHeader } from '@/components/page-header';
import { UserService } from '@/services/users.service';

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: PageProps) => {
  const folderInfo = await UserService.getFolderInfo(id);

  if (!folderInfo) {
    notFound();
  }

  return (
    <div className='space-y-4'>
      <PageHeader>Folder &#34;{folderInfo.title}&#34;</PageHeader>
      <ComicsFeed folderId={folderInfo.id} />
    </div>
  );
};

export default Page;
