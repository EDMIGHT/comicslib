'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { Folder } from '@/types/user.types';

import { Icons } from './icons';

type ProfileFoldersProps = {
  folders: Folder[];
  login: string;
};

export const ProfileFolders: FC<ProfileFoldersProps> = ({ folders, login }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div>
      <h2 className='flex justify-between gap-1 rounded px-2 py-1 text-base font-semibold hover:no-underline'>
        <span className='flex gap-1'>
          <Icons.folder /> Folders
        </span>

        {user?.login === login && (
          <Link href='/create-folder'>
            <Icons.add />
          </Link>
        )}
      </h2>
      <ul>
        {folders.map((f) => (
          <li key={f.id}>
            <Link
              href={`${login}/folders/${f.title.replace(/ /g, '-').toLocaleLowerCase()}`}
              className={cn(
                'flex items-center gap-1 rounded px-4 py-1 text-base',
                pathname ===
                  `${login}/folders/${f.title.replace(/ /g, '-').toLocaleLowerCase()}`
                  ? 'bg-active text-active-foreground'
                  : 'hover:bg-background/30 focus:bg-background/30'
              )}
            >
              {f.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
