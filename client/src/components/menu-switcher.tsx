'use client';

import { MenuSwitcherBase } from '@/components/menu-switcher-base';
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
  // if (windowSizes.width < 1024 && !isActiveMobileMenu) {
  //   return (
  //     <MenuSwitcherBase
  //       onClickBtn={() => setIsActiveMobileMenu(!isActiveMobileMenu)}
  //       className='flex lg:hidden'
  //     />
  //   );
  // }

  return null;
};
