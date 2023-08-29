import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ComicsFeed } from '@/components/comics-feed';
import { NavigationBtns, NavigationVariants } from '@/components/navigation-btns';
import { PageHeader } from '@/components/page-header';
import { HREFS } from '@/configs/href.configs';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { UserService } from '@/services/users.service';

export const metadata: Metadata = {
  title: 'Your folders',
  description:
    'User folders and the comics they have saved: an organized repository of comics that interest you',
};

type PageProps = {
  searchParams: {
    tab?: string;
  };
};

const Page = async ({ searchParams: { tab } }: PageProps) => {
  const user = await getAuthServer();
  if (!user) {
    return notFound();
  }

  const folders = await UserService.getAllFolders(user.login);

  const variants: NavigationVariants[] = folders.map((fold, i) => ({
    href: HREFS.library.folders,
    searchParams: `tab=${fold.id}`,
    title: fold.title,
  }));

  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Your folders</PageHeader>
      <NavigationBtns variants={variants} isFirstActive={!tab} />
      <ComicsFeed folderId={tab ?? folders[0].id} />
    </div>
  );
};

export default Page;
