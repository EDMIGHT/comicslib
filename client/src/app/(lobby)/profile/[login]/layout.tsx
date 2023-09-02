import { format } from 'date-fns';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { ProfileAvatar } from '@/components/profile-avatar';
import { ProfileFolders } from '@/components/profile-folders';
import { ProfileMenu } from '@/components/profile-menu';
import { UserAvatar } from '@/components/user-avatar';
import { getAuthServer } from '@/lib/helpers/getAuthServer';
import { createTitle } from '@/lib/utils';
import { UserService } from '@/services/users.service';

type LayoutProps = {
  children: ReactNode;
  params: {
    login: string;
  };
};

export async function generateMetadata({ params: { login } }: LayoutProps): Promise<Metadata> {
  const user = await UserService.getProfile(login);

  if (!user) {
    return notFound();
  }

  return {
    title: createTitle(user.login),
  };
}

const Layout: FC<LayoutProps> = async ({ children, params: { login } }) => {
  const currentUser = await getAuthServer();
  const user = await UserService.getProfile(login);

  if (!user) {
    return notFound();
  }

  return (
    <div className='grid grid-cols-[200px_1fr] gap-2 md:gap-6'>
      <ProfileAvatar {...user} currentUser={currentUser} />

      <div className='flex flex-col justify-center gap-1'>
        <h1 className='text-4xl font-semibold'>{user.login}</h1>
        <h2 className='text-sm text-foreground/75'>
          registered on {format(new Date(user.createdAt), 'PPP')}
        </h2>
      </div>

      <nav className='h-fit rounded border-none bg-card p-1'>
        <ProfileMenu login={user.login} />
        <ProfileFolders folders={user.folders} login={user.login} />
      </nav>

      {children}
    </div>
  );
};

export default Layout;
