'use client';

import { MenuSwitcherBase } from '@/components/menu-switcher-base';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useActions } from '@/hooks/use-actions';

export const MobileMenuSwitcher = () => {
  const { isActiveMobileMenu } = useAppSelector((state) => state.settings);
  const { setIsActiveMobileMenu } = useActions();

  if (!isActiveMobileMenu) {
    return (
      <MenuSwitcherBase
        onClickBtn={() => setIsActiveMobileMenu(!isActiveMobileMenu)}
        className='flex lg:hidden'
      />
    );
  }

  return null;
};
