import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { ProfileAvatar } from '@/components/profile-avatar';
import { ProfileFolders } from '@/components/profile-folders';
import { ProfileHeader } from '@/components/profile-header';
import { ProfileMenu } from '@/components/profile-menu';
import { HREFS } from '@/configs/href.configs';
import { SITE_META } from '@/configs/site.configs';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { absoluteUrl, createTitle } from '@/lib/utils';
import { UsersService } from '@/services/users.service';

type LayoutProps = {
  children: ReactNode;
  params: {
    login: string;
  };
};

export async function generateMetadata({ params: { login } }: LayoutProps): Promise<Metadata> {
  const user = await UsersService.getProfile(login);

  if (!user) {
    return {};
  }

  const ogUrl = new URL(SITE_META.generateOg.profile);
  ogUrl.searchParams.set('login', user.login);

  return {
    title: createTitle(user.login),
    description: `User Profile Page: ${user.login}`,
    openGraph: {
      title: user.login,
      description: `User Profile Page: ${user.login}`,
      type: 'article',
      url: absoluteUrl(`${HREFS.profile}/${user.login}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: user.login,
        },
      ],
    },
  };
}

const Layout: FC<LayoutProps> = async ({ children, params: { login } }) => {
  const currentUser = await getAuthServer();
  const user = await UsersService.getProfile(login);

  if (!user) {
    return notFound();
  }

  return (
    <div className='grid grid-cols-[200px_1fr] gap-2 md:gap-6'>
      <ProfileAvatar {...user} currentUser={currentUser} />

      <ProfileHeader user={user} currentUser={currentUser} />

      <nav className='h-fit rounded border-none bg-card p-1'>
        <ProfileMenu login={user.login} />
        <ProfileFolders folders={user.folders} login={user.login} />
      </nav>

      {children}
    </div>
  );
};

export default Layout;
