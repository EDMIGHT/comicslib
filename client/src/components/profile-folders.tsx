'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { IFolder } from '@/types/user.types';

import { Icons } from './ui/icons';

type ProfileFoldersProps = {
  folders: IFolder[];
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
              href={`/profile/${login}/folders/${f.id}`}
              className={cn(
                'flex items-center gap-1 rounded px-4 py-1 text-base',
                pathname.includes(`/profile/${login}/folders/${f.id}`)
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
