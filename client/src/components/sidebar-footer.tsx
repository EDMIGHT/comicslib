import Link from 'next/link';
import { FC } from 'react';

import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { SocialLink } from '@/types/configs.types';

type SidebarFooterProps = {
  socialLinks: readonly SocialLink[];
};

export const SidebarFooter: FC<SidebarFooterProps> = ({ socialLinks }) => {
  return (
    <div className='mt-auto'>
      <Separator className='my-2' />
      {socialLinks && (
        <ul className='flex flex-wrap items-center gap-1'>
          {socialLinks.map((social, i) => {
            const Icon = Icons[social.icon ?? 'next'];
            return (
              <li key={'social' + i} className='inline-block'>
                <Link
                  href={social.href}
                  className='block rounded p-2 hover:bg-background/30 focus:bg-background/30'
                >
                  <Icon className='h-6 w-6' />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
