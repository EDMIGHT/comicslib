'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC, useState } from 'react';

import { HREFS } from '@/configs/href.configs';
import { IFolderWithComics } from '@/types/user.types';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type FolderProps = {};

export const Folder: FC<IFolderWithComics> = ({ id, title, comics }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <Card className='flex cursor-pointer flex-col items-start justify-start gap-2 p-2 transition-colors hover:bg-card/80 '>
      <div className='flex w-full justify-between gap-2'>
        <Link href={`${HREFS.library.folders}/${id}`}>
          <h3 className=' text-xl font-semibold transition-all hover:brightness-75'>
            {title}
          </h3>
        </Link>
        <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm'>
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[70px]'>
            <DropdownMenuGroup>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className='text-destructive'>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        {comics.length > 0 ? (
          <ul className='flex gap-2'>
            {comics.map((comic) => (
              <li key={comic.id}>
                <Link href={`${HREFS.comics}/${comic.id}`}>
                  <Image
                    src={comic.img}
                    alt={comic.title}
                    width={80}
                    height={96}
                    className='h-24 w-16 overflow-hidden rounded object-cover object-center transition-all hover:brightness-75'
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className='text-sm text-secondary-foreground'>empty folder</div>
        )}
      </div>
    </Card>
  );
};
