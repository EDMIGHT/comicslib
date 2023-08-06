import { Header } from '@/components/layouts/header';
import { Sidebar } from '@/components/layouts/sidebar';
import MenuSetter from '@/components/menu-setter';

interface LobbyLayoutProps {
  children: React.ReactNode;
}

const LobbyLayout = ({ children }: LobbyLayoutProps) => {
  return (
    <div className='relative flex min-h-screen'>
      <Sidebar />

      <MenuSetter isOpen />

      <div className='flex-1'>
        <Header />
        <main className='container py-2'>{children}</main>
      </div>
    </div>
  );
};

export default LobbyLayout;
