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
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { FileDialog } from '@/components/file-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { HREFS } from '@/configs/href.configs';
import { toast } from '@/hooks/use-toast';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { convertFileToBase64 } from '@/lib/utils';
import {
  createChapterSchema,
  ICreateChapterFields,
} from '@/lib/validators/chapter.validators';
import { ChaptersService, ICreateChapterArg } from '@/services/chapters.service';

import { SortablePage } from '../sortable-page';

type CreateChapterFormProps = {
  comicId: string;
};

type IFieldControlPage = {
  onChange: (...event: any[]) => void;
  currentValues: ICreateChapterFields['pages'];
};

export const CreateChapterForm: FC<CreateChapterFormProps> = ({ comicId }) => {
  const router = useRouter();
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
  const form = useForm<ICreateChapterFields>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: '',
      pages: [],
    },
  });

  const { mutate: createChapter, isLoading } = useMutation({
    mutationKey: ['chapters'],
    mutationFn: async (data: ICreateChapterArg) => {
      return await ChaptersService.create(data);
    },
    onSuccess: ({ id, number, title }) => {
      toast({
        title: 'Congratulations!!',
        description: `You have successfully created a chpater: Ch. ${number} ${
          title ? title : ''
        }`,
      });
      router.replace(`${HREFS.chapter}/${id}`);
    },
    onError: (err) => {
      handleErrorMutation(err);
    },
  });

  const onSelectFile = async (file: File) => {
    const imageBASE64 = await convertFileToBase64(file);

    if (!imageBASE64) {
      return toast({
        title: 'Oops. Something went wrong!',
        description:
          'An error occurred while processing the uploaded image, please try again later',
        variant: 'destructive',
      });
    }

    return imageBASE64;
  };

  const onClickUploadPage = async ({
    file,
    currentValues,
    onChange,
  }: IFieldControlPage & {
    file: File;
  }) => {
    const convertedFile = await onSelectFile(file);

    return onChange([
      ...currentValues,
      {
        id: nanoid(),
        // id: currentValues.length + 1,
        img: convertedFile,
      },
    ]);
  };
  const onClickEditPage = async ({
    file,
    changeId,
    currentValues,
    onChange,
  }: IFieldControlPage & {
    changeId: ICreateChapterFields['pages'][number]['id'];
    file: File;
  }) => {
    const convertedFile = await onSelectFile(file);

    return onChange(
      currentValues.map((page) => {
        if (page.id === changeId) {
          return {
            id: page.id,
            img: convertedFile,
          };
        }

        return page;
      })
    );
  };

  const onSubmit = ({ number, pages, title }: ICreateChapterFields) => {
    createChapter({
      comicId,
      number: Number(number),
      title,
      pages: pages.map(({ img }, i) => ({
        number: i + 1,
        img,
      })),
    });
  };

  const onDragEnd = ({
    e,
    onChange,
    currentValues,
  }: IFieldControlPage & {
    e: DragEndEvent;
  }) => {
    const { active, over } = e;
    if (over?.id && active.id !== over.id) {
      const oldIndex = currentValues.findIndex((page) => page.id === active.id);
      const newIndex = currentValues.findIndex((page) => page.id === over.id);

      const newArray = arrayMove(currentValues, oldIndex, newIndex);

      onChange(newArray);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2 md:flex-row'>
          <FormItem className='w-full'>
            <FormLabel>Number</FormLabel>
            <FormControl>
              <Input
                type='number'
                inputMode='numeric'
                placeholder='enter number..'
                {...form.register('number', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage message={form.formState.errors.number?.message} />
          </FormItem>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='enter title..' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='pages'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <div className='flex items-center justify-between gap-2'>
                <FormLabel isRequired>Pages</FormLabel>
                {field.value.length > 0 && (
                  <Button
                    type='button'
                    variant='ghost'
                    className='gap-1'
                    onClick={() => field.onChange([])}
                  >
                    <Icons.cleaning className='h-5 w-5' /> Remove All Pages
                  </Button>
                )}
              </div>
              <ul className='flex flex-wrap items-center gap-2'>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(e) =>
                    onDragEnd({ e, currentValues: field.value, onChange: field.onChange })
                  }
                >
                  <SortableContext
                    items={field.value}
                    strategy={horizontalListSortingStrategy}
                  >
                    {field.value.map((page, i) => (
                      <li key={page.id}>
                        <SortablePage
                          {...page}
                          pageNumber={i + 1}
                          onClickDelete={(deletedId) =>
                            field.onChange(field.value.filter((page) => page.id !== deletedId))
                          }
                          onClickEditPage={(changeId, selectedFile) =>
                            onClickEditPage({
                              changeId,
                              file: selectedFile,
                              currentValues: field.value,
                              onChange: field.onChange,
                            })
                          }
                        />
                      </li>
                    ))}
                  </SortableContext>
                </DndContext>
                <li key='control'>
                  <FormControl>
                    <FileDialog
                      onSelectFile={(selectedFile) =>
                        onClickUploadPage({
                          file: selectedFile,
                          onChange: field.onChange,
                          currentValues: field.value,
                        })
                      }
                    >
                      <div className='relative flex h-[270px] w-[200px] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded border bg-background p-2 transition-colors hover:bg-muted'>
                        <Icons.uploadCloud className='h-10 w-10' />
                        <span className='text-center text-sm font-medium'>
                          Click to upload page for the comic
                        </span>
                      </div>
                    </FileDialog>
                  </FormControl>
                </li>
              </ul>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' isLoading={isLoading} className='self-end'>
          Upload
        </Button>
      </form>
    </Form>
  );
};
