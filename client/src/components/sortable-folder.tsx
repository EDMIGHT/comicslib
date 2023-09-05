'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

import { IFolderWithComics } from '@/types/user.types';

import { Folder } from './layouts/folder';

export const SortableFolder: FC<IFolderWithComics> = (folder) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: folder.id,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Folder {...folder} />
    </div>
  );
};
