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

      <div className='flex-1'>
        <Header />
        <main className='container'>{children}</main>
      </div>
    </div>
  );
};

export default LobbyLayout;
