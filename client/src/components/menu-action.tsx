'use client';

import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { NavigationItemAction } from '@/types/configs.types';

type MenuActionProps = HTMLAttributes<HTMLLinkElement> & {
  action: NavigationItemAction;
};

export const MenuAction: FC<MenuActionProps> = ({ action }) => {
  const ActionIcon = Icons[action.icon];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={action.href} className='hover:brightness-75'>
          <ActionIcon />
        </Link>
      </TooltipTrigger>
      <TooltipContent>Adding a new title to the site</TooltipContent>
    </Tooltip>
  );
};
