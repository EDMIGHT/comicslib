import { Header } from '@/components/layouts/header';
import { Sidebar } from '@/components/layouts/sidebar';
import { MenuSetter } from '@/components/menu-setter';
import { getAuthServer } from '@/lib/helpers/getAuthServer';

interface LobbyLayoutProps {
  children: React.ReactNode;
}

const LobbyLayout = async ({ children }: LobbyLayoutProps) => {
  const user = await getAuthServer();

  return (
    <div className='relative flex min-h-screen'>
      <Sidebar user={user} />

      <MenuSetter isOpen />

      <div className='flex-1'>
        <Header user={user} />
        <main className='container py-2'>{children}</main>
      </div>
    </div>
  );
};

export default LobbyLayout;
