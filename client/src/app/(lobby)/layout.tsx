import { Header } from '@/components/layouts/header';
import { Menu } from '@/components/layouts/menu';
import { Sidebar } from '@/components/layouts/sidebar';

interface LobbyLayoutProps {
  children: React.ReactNode;
}

const LobbyLayout = ({ children }: LobbyLayoutProps) => {
  return (
    <div className='relative flex min-h-screen'>
      <Sidebar />

      {/* <Header /> */}
      <main className='container flex-1 py-4'>{children}</main>
    </div>
  );
};

export default LobbyLayout;
