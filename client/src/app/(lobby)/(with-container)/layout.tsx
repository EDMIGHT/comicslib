import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <main className='container p-2 md:px-4'>{children}</main>;
};

export default Layout;
