'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { DndKeyboardRecommendAlert } from '@/components/layouts/dnd-keyboard-recommend-alert';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { SortableFolder } from '@/components/sortable-folder';
import { Button } from '@/components/ui/button';
import { useKeyPress } from '@/hooks/use-key-press';
import { toast } from '@/hooks/use-toast';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { FoldersService } from '@/services/folders.service';
import { IFolderWithComics } from '@/types/user.types';

type FoldersSortableListProps = {
  folders: IFolderWithComics[];
};

export const FoldersSortableList: FC<FoldersSortableListProps> = ({ folders }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [showKeyboardRecommend, setShowKeyboardRecommend] = useState(false);

  const [tempFolders, setTempFolders] = useState<IFolderWithComics[]>(folders);

  useEffect(() => {
    setTempFolders(folders); // allows us to track the deletion of folders
  }, [folders]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      keyboardCodes: {
        start: ['Space'],
        cancel: ['Escape'],
        end: ['Space'],
      },
    })
  );

  const isTabPressed = useKeyPress('Tab');

  useEffect(() => {
    if (isTabPressed && !showKeyboardRecommend) {
      setShowKeyboardRecommend(true);
    }
  }, [isTabPressed, showKeyboardRecommend]);

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

  const { mutate: reorderFolders, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.folders],
    mutationFn: async () => {
      return await FoldersService.reorderFolders({
        folders: tempFolders.map((currentFol) => currentFol.id),
      });
    },
    onSuccess: () => {
      setIsEdit(false);
      router.refresh();
      toast({
        title: 'Congratulations!!',
        description: 'You have successfully updated the order of your folders',
      });
    },
    onError: (err) => {
      ErrorHandler.mutation(err, {
        notFoundError: {
          title: 'Folders not up to date',
          description:
            'Refresh the page because one of the folders you displayed no longer exists',
        },
        forbiddenError: {
          title: 'Access error',
          description: 'One or more folders you want to change are not yours',
        },
      });
    },
  });

  return (
    <>
      {showKeyboardRecommend && <DndKeyboardRecommendAlert />}
      <div className='flex flex-col gap-3'>
        <ul className='space-y-2 overflow-hidden'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={tempFolders} strategy={verticalListSortingStrategy}>
              {tempFolders.map((folder) => (
                <li key={folder.id}>
                  <SortableFolder {...folder} />
                </li>
              ))}
            </SortableContext>
          </DndContext>
        </ul>

        {isEdit && (
          <Button
            className='w-fit self-end'
            isLoading={isLoading}
            onClick={() => reorderFolders()}
          >
            Save changes
          </Button>
        )}
      </div>
    </>
  );
};
