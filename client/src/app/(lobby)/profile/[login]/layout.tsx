import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { ProfileMenu } from '@/components/profile-menu';
import { Card } from '@/components/ui/card';
import { createTitle } from '@/lib/helpers/general.helper';
import { ProfileService } from '@/services/profile.service';

type LayoutProps = {
  children: ReactNode;
  params: {
    login: string;
  };
};

export async function generateMetadata({ params: { login } }: LayoutProps): Promise<Metadata> {
  const user = await ProfileService.get(login);

  if (!user) {
    return notFound();
  }

  return {
    title: createTitle(user.login),
  };
}

const Layout: FC<LayoutProps> = async ({ children, params: { login } }) => {
  const user = await ProfileService.get(login);

  if (!user) {
    return notFound();
  }

  // TODO картинку пользователя упаковать в один компонент с остальными

  return (
    <div className='grid grid-cols-profile-md gap-2 md:gap-6'>
      <div className='relative h-[120px] w-[120px] overflow-hidden rounded-full md:h-[200px] md:w-[200px]'>
        <Image src={user.img} alt={user.login} fill />
      </div>
      <div className='flex flex-col justify-center gap-1'>
        <h1 className='text-4xl font-semibold'>{user.login}</h1>
        <h2 className='text-sm text-foreground/75'>
          registered on {new Date(user.createdAt).toLocaleDateString()}
        </h2>
      </div>

      <div>
        <ProfileMenu />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
