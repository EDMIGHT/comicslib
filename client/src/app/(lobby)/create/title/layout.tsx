import { FC, ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modals: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children, modals }) => {
  return (
    <>
      {children}
      {modals}
    </>
  );
};

export default Layout;
