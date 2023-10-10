import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <main className='container p-2 md:px-8'>{children}</main>;
};

export default Layout;
