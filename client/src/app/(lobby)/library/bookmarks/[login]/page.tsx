import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { BookmarksFeed } from '@/components/bookmarks-feed';
import { createTitle } from '@/lib/helpers/general.helper';
import { UserService } from '@/services/users.service';

type PageProps = {
  params: {
    login: string;
  };
};

export async function generateMetadata({ params: { login } }: PageProps): Promise<Metadata> {
  return {
    title: createTitle(`${login} bookmarks`),
    description: `Open ${login}'s bookmarks and dive into his comic preferences.`,
  };
}

const Page: FC<PageProps> = async ({ params: { login } }) => {
  const existedUser = await UserService.get(login);
  if (!existedUser) {
    return notFound();
  }

  return <BookmarksFeed login={existedUser.login} />;
};

export default Page;
