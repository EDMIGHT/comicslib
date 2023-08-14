import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

import { ReadingHistoryFeed } from '@/components/reading-history-feed';
import { createTitle } from '@/lib/helpers/general.helper';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { UserService } from '@/services/users.service';

export const metadata: Metadata = {
  title: createTitle('Your Reading History'),
  description:
    'Track the reading history of your comics on a personal read history page for the user. Recall each adventure and take a look at your comic book journey.',
};

const Page = async () => {
  const user = await getAuthServer();
  if (!user) {
    return notFound();
  }

  return <ReadingHistoryFeed login={user.login} />;
};

export default Page;
