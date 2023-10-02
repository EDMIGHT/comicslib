'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HREFS } from '@/configs/href.configs';
import { PROFILE_NAVIGATION } from '@/configs/site.configs';
import { cn } from '@/lib/utils';
import { IFolder } from '@/types/user.types';

type ProfileMobileNavProps = {
  login: string;
  folders: IFolder[];
};

export const ProfileMobileNav: FC<ProfileMobileNavProps> = ({ login, folders }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openFolderList, setOpenFolderList] = useState(false);

  const isExistAtLeastOneFolder = folders && folders.length > 0;
  const isMoreThan5Folders = folders && folders.length > 5;

  return (
    <nav className='col-span-2 md:hidden'>
      <Card className='flex w-fit gap-2 border-none p-1'>
        {PROFILE_NAVIGATION.map((navItem, i) => {
          return (
            <Link
              key={i}
              href={`${HREFS.profile}/${login}${navItem.href}`}
              className={cn(
                buttonVariants({ variant: 'link' }),
                pathname === `${HREFS.profile}/${login}${navItem.href}` &&
                  'bg-active text-active-foreground'
              )}
            >
              {navItem.title}
            </Link>
          );
        })}
        {isExistAtLeastOneFolder && (
          <Popover open={openFolderList} onOpenChange={setOpenFolderList}>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                role='combobox'
                className='min-w-[100px] justify-center gap-1'
              >
                {folders.find(
                  (folder) => pathname === `${HREFS.profile}/${login}/folders/${folder.id}`
                )?.title ?? 'select folder'}

                <Icons.chevronUpDown className='h-5 w-5' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <ScrollArea className='flex max-h-[20vh] flex-col p-1' type='always'>
                <Command
                  filter={(currentFolderId, searchText) => {
                    // ? if there were no limit, then most likely the best option would be to create a store of filtered values,
                    // so as not to go through the entire array every time, but in this case this is overkill
                    const desiredFolders = folders.filter((folder) =>
                      folder.title.toLowerCase().startsWith(searchText.toLowerCase())
                    );
                    return desiredFolders.find((folder) => folder.id === currentFolderId)
                      ? 1
                      : 0;
                  }}
                >
                  {isMoreThan5Folders && (
                    <CommandInput placeholder='Search folder...' className='h-9' />
                  )}
                  <CommandEmpty>No folders found</CommandEmpty>
                  <CommandGroup>
                    {folders.map(({ id, title }) => (
                      <CommandItem
                        key={id}
                        value={id}
                        onSelect={(id) =>
                          router.push(`${HREFS.profile}/${login}/folders/${id}`)
                        }
                      >
                        {title}
                        <Icons.check
                          className={cn(
                            'ml-auto h-4 w-4',
                            pathname === `${HREFS.profile}/${login}/folders/${id}`
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        )}
      </Card>
    </nav>
  );
};
