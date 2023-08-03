import Link from 'next/link';
import { FC } from 'react';

import { SocialLink } from '@/types/configs.types';

type SidebarFooterProps = {
  socialLinks: SocialLink[];
};

export const SidebarFooter: FC<SidebarFooterProps> = ({ socialLinks }) => {
  return (
    <div className='mt-auto'>
      {socialLinks && (
        <ul className='flex flex-wrap items-center gap-1'>
          {socialLinks.map((social, i) => (
            <li key={'social' + i} className='inline-block'>
              <Link
                href={social.href}
                className='block rounded p-2 hover:bg-background/30 focus:bg-background/30'
              >
                <social.icon className='h-6 w-6' />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
