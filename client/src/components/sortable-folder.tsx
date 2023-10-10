'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

import { Folder } from '@/components/layouts/folder';
import { cn } from '@/lib/utils';
import { IFolderWithComics } from '@/types/user.types';

export const SortableFolder: FC<IFolderWithComics> = (folder) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable(
    {
      id: folder.id,
    }
  );

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Folder {...folder} className={cn(isDragging && 'cursor-grabbing')} />
    </div>
  );
};
