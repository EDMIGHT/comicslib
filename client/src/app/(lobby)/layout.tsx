import { Header } from '@/components/header';

interface LobbyLayoutProps {
  children: React.ReactNode;
}

const LobbyLayout = ({ children }: LobbyLayoutProps) => {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Header />
      <main className='container flex-1'>{children}</main>
    </div>
  );
};

export default LobbyLayout;
