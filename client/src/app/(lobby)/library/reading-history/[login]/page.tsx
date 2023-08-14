import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { ReadingHistoryFeed } from '@/components/reading-history-feed';
import { createTitle } from '@/lib/helpers/general.helper';
import { UserService } from '@/services/users.service';

type PageProps = {
  params: {
    login: string;
  };
};

export async function generateMetadata({ params: { login } }: PageProps): Promise<Metadata> {
  return {
    title: createTitle(`${login} Reading History`),
    description:
      'Track the reading history of your comics on a personal read history page for the user. Recall each adventure and take a look at your comic book journey.',
  };
}

const Page: FC<PageProps> = async ({ params: { login } }) => {
  const existedUser = await UserService.get(login);
  if (!existedUser) {
    return notFound();
  }

  return <ReadingHistoryFeed login={existedUser.login} />;
};

export default Page;
