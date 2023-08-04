'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';

type ComicMenuProps = {
  comicId: string;
};

export const ComicMenu: FC<ComicMenuProps> = ({ comicId }) => {
  const router = useRouter();
  return (
    <div className='flex gap-2'>
      <Button onClick={() => router.push(`/chapter/${comicId}/1`)}>read</Button>
      <Button>to folder</Button>
    </div>
  );
};
