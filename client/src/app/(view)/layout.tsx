import { Header } from '@/components/layouts/header';
import { Sidebar } from '@/components/layouts/sidebar';
import { MenuSetter } from '@/components/menu-setter';
import { SidebarServer } from '@/components/sidebar-server';
import { getAuthServer } from '@/lib/helpers/getAuthServer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const user = await getAuthServer();

  return (
    <div className='relative flex min-h-screen'>
      <Sidebar user={user} />

      <MenuSetter isOpen={false} />

      <div className='flex-1'>
        <Header user={user} />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
