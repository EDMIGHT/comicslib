import { ReactNode } from 'react';

import { Header } from '@/components/layouts/header';
import { MobileSidebar } from '@/components/layouts/mobile-sidebar';
import { Sidebar } from '@/components/layouts/sidebar';
import { getAuthServer } from '@/lib/getAuthServer';

interface LobbyLayoutProps {
  children: ReactNode;
}

const LobbyLayout = async ({ children }: LobbyLayoutProps) => {
  const user = await getAuthServer();

  return (
    <div className='relative flex min-h-screen'>
      <Sidebar user={user} />
      <MobileSidebar user={user} />

      <div className='relative flex-1'>
        <Header user={user} />
        {children}
      </div>
    </div>
  );
};

export default LobbyLayout;
