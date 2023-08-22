'use client';

import type { Pages } from 'contentlayer/generated';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

import { CloseModalRouter } from './close-modal-router';
import { Mdx } from './mdx/mdx-components';
import { OverlayModal } from './overlay-modal';
import { ScrollArea } from './ui/scroll-area';

type DocsModalProps = {
  content: Pages;
};

export const DocsModal: FC<DocsModalProps> = ({ content }) => {
  const router = useRouter();
  const contentModalRef = useRef<HTMLDivElement>(null);
  // const pathname = usePathname();

  useEffect(() => {
    const onClickBody = (e: MouseEvent) => {
      if (
        contentModalRef &&
        contentModalRef.current &&
        !e.composedPath().includes(contentModalRef.current)
      ) {
        router.back();
      }
    };

    document.body.addEventListener('click', onClickBody);
    return () => document.body.removeEventListener('click', onClickBody);
  }, []);

  return (
    <OverlayModal>
      <ScrollArea
        ref={contentModalRef}
        className={cn(
          'relative h-[90vh] w-[90vw] bg-background p-5 border border-border rounded z-[51]'
        )}
      >
        <CloseModalRouter />
        <Mdx code={content.body.code} />
      </ScrollArea>
    </OverlayModal>
  );
};
