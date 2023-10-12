'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, memo, useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { toast } from '@/hooks/use-toast';
import { handleErrorMutation } from '@/lib/handleErrorMutation';
import { cn } from '@/lib/utils';
import { FoldersService } from '@/services/folders.service';
import { IFolderWithComics } from '@/types/user.types';

type FolderProps = IFolderWithComics & {
  className?: string;
};

export const Folder: FC<FolderProps> = memo(({ id, title, comics, className }) => {
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { mutate: deleteFolder, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.folders],
    mutationFn: async (folderId: string) => {
      return await FoldersService.deleteFolder(folderId);
    },
    onSuccess: (res) => {
      toast({
        title: 'Congratulations!!',
        description: `You have successfully deleted the folder "${res.title}"`,
      });
      router.refresh();
    },
    onError: (err) => {
      handleErrorMutation(err, {
        forbiddenError: {
          title: 'Access error',
          description: 'You are trying to delete a folder that you do not own',
        },
      });
    },
  });

  return (
    <Card
      className={cn(
        'flex flex-col items-start justify-start gap-2 p-2 transition-colors',
        className
      )}
    >
      <div className='flex w-full justify-between gap-2'>
        <Link href={`${HREFS.library.folders}/${id}`}>
          <h3 className=' text-xl font-semibold transition-all hover:brightness-75'>
            {title}
          </h3>
        </Link>
        <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm' disabled={isLoading}>
              <Icons.more className='h-5 w-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='font-medium'>
            <DropdownMenuGroup>
              <Link href={`${HREFS.library.folders}/${id}/edit`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => deleteFolder(id)}
                disabled={isLoading}
                className='text-destructive'
              >
                Delete
              </DropdownMenuItem>
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
        <div className='text-sm text-muted-foreground'>empty</div>
      )}
    </Card>
  );
});

Folder.displayName = 'Folder';
