import { Header } from '@/components/layouts/header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
