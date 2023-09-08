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
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { SortableFolder } from '@/components/sortable-folder';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { UserService } from '@/services/users.service';
import { IFolderWithComics } from '@/types/user.types';

type FoldersSortableListProps = {
  folders: IFolderWithComics[];
};

export const FoldersSortableList: FC<FoldersSortableListProps> = ({ folders }) => {
  const router = useRouter();
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

  const { mutate: reorderFolders, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.folders],
    mutationFn: async () => {
      return await UserService.reorderFolders({
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
      handleErrorMutation(err, {
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
  );
};
