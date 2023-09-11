'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { SearchComics } from '@/components/search-comics';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { isMacOS } from '@/lib/utils';

export const ComicSearch: FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <Button
        variant='outline'
        className='relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'
        onClick={() => setOpen(true)}
      >
        <Icons.search className='h-4 w-4 xl:mr-2' aria-hidden='true' />
        <span className='hidden xl:inline-flex'>search comics...</span>
        <kbd className='pointer-events-none absolute right-1 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex'>
          <abbr title={isMacOS() ? 'Command' : 'Control'}>{isMacOS() ? '⌘' : 'Ctrl'} K</abbr>
        </kbd>
      </Button>
      <SearchComics
        open={open}
        setOpen={setOpen}
        onClickItem={(comic) => {
          router.push(`${HREFS.comics}/${comic.id}`);
        }}
      />
    </>
  );
};
