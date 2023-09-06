'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FC, useEffect, useState } from 'react';

import { IFolderWithComics } from '@/types/user.types';

import { SortableFolder } from './sortable-folder';
import { Button } from './ui/button';

type FoldersSortableListProps = {
  folders: IFolderWithComics[];
};

export const FoldersSortableList: FC<FoldersSortableListProps> = ({ folders }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [tempFolders, setTempFolders] = useState<IFolderWithComics[]>(folders);

  useEffect(() => {
    setTempFolders(folders); // allows us to track the deletion of folders
  }, [folders]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over?.id && active.id !== over.id) {
      setTempFolders((prev) => {
        const oldIndex = prev?.findIndex((page) => page.id === active.id);
        const newIndex = prev?.findIndex((page) => page.id === over.id);

        const test = arrayMove(prev, oldIndex, newIndex);

        return test;
      });
      !isEdit && setIsEdit(true);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <ul className='space-y-2 overflow-hidden'>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={tempFolders} strategy={verticalListSortingStrategy}>
            {tempFolders.map((folder) => (
              <li key={folder.id}>
                <SortableFolder {...folder} />
              </li>
            ))}
          </SortableContext>
        </DndContext>
      </ul>

      {isEdit && <Button className='w-fit self-end'>Save changes</Button>}
    </div>
  );
};
