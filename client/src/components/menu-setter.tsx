'use client';

import { useEffect } from 'react';

import { useActions } from '@/hooks/use-actions';

type MenuSetterProps = {
  isOpen?: boolean;
};

export const MenuSetter = ({ isOpen = false }: MenuSetterProps) => {
  const { setIsActiveMenu } = useActions();

  useEffect(() => {
    setIsActiveMenu(isOpen);
  }, []);

  return null;
};
