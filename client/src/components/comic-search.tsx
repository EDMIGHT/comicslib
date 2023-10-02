'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { SearchComics } from '@/components/search-comics';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { cn, isMacOS } from '@/lib/utils';

type ComicSearchProps = {
  isScrolled?: boolean;
};

// BAG in mobile adaptation mode (I don’t get it in other options), there may be a hydration error when checking the client’s operating system
// Is it worth complicating the code to fix this error or not...

export const ComicSearch: FC<ComicSearchProps> = ({ isScrolled = false }) => {
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
        className={cn(
          'relative h-9 w-9  p-0  xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2',
          !isScrolled && 'bg-background/70 hover:bg-background'
        )}
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
