'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

import { ChapterPage } from '@/components/layouts/chapter-page';
import { ICreateChapterFields } from '@/lib/validators/chapter.validators';

type ICreateChapterField = ICreateChapterFields['pages'][number];

export type SortablePageProps = ICreateChapterField & {
  pageNumber: number;
  onClickDelete: (id: ICreateChapterField['id']) => void;
  onClickEditPage: (changeId: ICreateChapterField['id'], file: File) => void;
};

export const SortablePage: FC<SortablePageProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable(
    {
      id: props.id,
    }
  );

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ChapterPage {...props} isDragging={isDragging} />
    </div>
  );
};
