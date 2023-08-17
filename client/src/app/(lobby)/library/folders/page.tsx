import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ComicsFeed } from '@/components/comics-feed';
import { NavigationBtns, NavigationVariants } from '@/components/navigation-btns';
import { PageHeader } from '@/components/page-header';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { UserService } from '@/services/users.service';

type PageProps = {
  searchParams: {
    tab?: string;
  };
};

export const metadata: Metadata = {
  title: 'Your folders',
  description:
    'User folders and the comics they have saved: an organized repository of comics that interest you',
};

const Page = async ({ searchParams: { tab } }: PageProps) => {
  const user = await getAuthServer();
  if (!user) {
    return notFound();
  }

  const folders = await UserService.getAllFolders(user.login);

  const variants: NavigationVariants[] = folders.map((fold, i) => ({
    href: `/library/folders?tab=${fold.id}`,
    title: fold.title,
  }));

  return (
    <div className='flex flex-col gap-2'>
      <PageHeader>Your folders</PageHeader>
      <NavigationBtns
        variants={variants}
        currentActive={
          (tab && variants.find((v) => v.href.includes(tab))?.href) || variants[0].href
        }
      />
      <ComicsFeed folderId={tab ?? folders[0].id} />
    </div>
  );
};

export default Page;
