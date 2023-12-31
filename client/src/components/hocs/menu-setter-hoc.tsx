'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';

import { useAppSelector } from '@/hooks/redux-hooks';
import { useActions } from '@/hooks/use-actions';

type MenuSetterHOCProps = {
  children: ReactNode;
};

export const MenuSetterHOC: FC<MenuSetterHOCProps> = ({ children }) => {
  const { isActiveMenu } = useAppSelector((state) => state.settings);
  const prevStateMenu = useRef<boolean>(isActiveMenu);
  const { setIsActiveMenu } = useActions();

  useEffect(() => {
    const previousMenuState = prevStateMenu.current;
    setIsActiveMenu(false);

    return () => {
      setIsActiveMenu(previousMenuState);
    };
  }, [prevStateMenu, setIsActiveMenu]);

  return <>{children}</>;
};
