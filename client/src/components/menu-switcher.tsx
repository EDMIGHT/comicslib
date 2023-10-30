'use client';

import { MenuSwitcherBase } from '@/components/layouts/menu-switcher-base';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useActions } from '@/hooks/use-actions';

export const MenuSwitcher = () => {
  const { isActiveMenu } = useAppSelector((state) => state.settings);
  const { setIsActiveMenu } = useActions();

  if (!isActiveMenu) {
    return (
      <MenuSwitcherBase
        onClickBtn={() => setIsActiveMenu(!isActiveMenu)}
        className='hidden lg:flex'
      />
    );
  }

  return null;
};
