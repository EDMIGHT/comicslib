import { Header } from '@/components/layouts/header';
import { Sidebar } from '@/components/layouts/sidebar';
import MenuSetter from '@/components/menu-setter';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='relative flex min-h-screen'>
      <Sidebar />

      <MenuSetter isOpen={false} />

      <div className='flex-1'>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
