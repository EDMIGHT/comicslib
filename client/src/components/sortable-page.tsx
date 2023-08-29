'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

import { Icons } from '@/components/ui/icons';
import { ICreateChapterFields } from '@/lib/validators/chapter.validators';

import { ComicPageImg } from './comic-page-img';
import { FileDialog } from './file-dialog';

type ICreateChapterField = ICreateChapterFields['pages'][number];

type SortablePageProps = ICreateChapterField & {
  pageNumber: number;
  onClickDelete: (id: ICreateChapterField['id']) => void;
  onClickEditPage: (changeId: ICreateChapterField['id'], file: File) => void;
};

export const SortablePage: FC<SortablePageProps> = ({
  img,
  id,
  pageNumber,
  onClickDelete,
  onClickEditPage,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='relative'>
      <FileDialog onSelectFile={(selectedFile) => onClickEditPage(id, selectedFile)}>
        <button className='group absolute left-1 top-1 z-10 rounded-full bg-card p-1'>
          <Icons.edit className='h-6 w-6 transition-colors group-hover:stroke-active' />
        </button>
      </FileDialog>
      <button
        className='group absolute right-1 top-1 z-10 rounded-full bg-card p-1'
        onClick={() => onClickDelete(id)}
      >
        <Icons.delete className='h-6 w-6 transition-colors group-hover:stroke-red-900' />
      </button>
      <ComicPageImg imgSrc={img} alt='comic page' />
      <span className='absolute bottom-1 right-1 min-w-[30px] rounded bg-active p-1 text-center'>
        {pageNumber}
      </span>
    </div>
  );
};
