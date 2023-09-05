'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { FC, memo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HREFS } from '@/configs/href.configs';
import { IFolderWithComics } from '@/types/user.types';

export const Folder: FC<IFolderWithComics> = memo(({ id, title, comics }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <Card className='flex flex-col items-start justify-start gap-2 p-2 transition-colors'>
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
          <DropdownMenuContent align='end' className='w-fit'>
            <DropdownMenuGroup>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className='text-destructive'>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {comics.length > 0 ? (
        <ul className='flex gap-2'>
          {comics.map(({ id, img, title }) => (
            <li key={id}>
              <Link href={`${HREFS.comics}/${id}`}>
                <Image
                  src={img}
                  alt={title}
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
    </Card>
  );
});

Folder.displayName = 'Folder';
