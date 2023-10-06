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
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { DndKeyboardRecommendAlert } from '@/components/dnd-keyboard-recommend-alert';
import { FileDialog } from '@/components/file-dialog';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { SortablePage } from '@/components/sortable-page';
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
import { LIMITS } from '@/configs/site.configs';
import { useKeyPress } from '@/hooks/use-key-press';
import { toast } from '@/hooks/use-toast';
import { convertImgToBase64 } from '@/lib/helpers/convertImgToBase64';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { cn } from '@/lib/utils';
import {
  createChapterSchema,
  ICreateChapterFields,
} from '@/lib/validators/chapter.validators';
import { ChaptersService, ICreateChapterArg } from '@/services/chapters.service';

type CreateChapterFormProps = {
  comicId: string;
};

type IFieldControlPage = {
  onChange: (...event: unknown[]) => void;
  currentValues: ICreateChapterFields['pages'];
};

export const CreateChapterForm: FC<CreateChapterFormProps> = ({ comicId }) => {
  const [showKeyboardRecommend, setShowKeyboardRecommend] = useState(false);
  const router = useRouter();
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

  const form = useForm<ICreateChapterFields>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: '',
      pages: [],
    },
  });

  const isTabPressed = useKeyPress('Tab');

  useEffect(() => {
    if (isTabPressed && !showKeyboardRecommend) {
      setShowKeyboardRecommend(true);
    }
  }, [isTabPressed, showKeyboardRecommend]);

  const { mutate: createChapter, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.chapters],
    mutationFn: async (data: ICreateChapterArg) => {
      return await ChaptersService.create(data);
    },
    onSuccess: ({ id, number, title }) => {
      toast({
        title: 'Congratulations!!',
        description: `You have successfully created a chapter: Ch. ${number} ${
          title ? title : ''
        }`,
      });
      router.replace(`${HREFS.chapter}/${id}`);
    },
    onError: (err) => {
      handleErrorMutation(err, {
        conflictError: {
          title: 'Chapter already exists',
          description: 'There already exists a chapter for this comic with this number',
          action: () => {
            form.setError('number', {
              type: 'server',
              message: 'chapter already exists',
            });
          },
        },
      });
    },
  });

  const onClickUploadPage = async ({
    files,
    currentValues,
    onChange,
  }: IFieldControlPage & {
    files: File[];
  }) => {
    try {
      const convertedFiles = await Promise.all(files.map((file) => convertImgToBase64(file)));

      if (convertedFiles.length > 0) {
        return onChange([
          ...currentValues,
          ...convertedFiles.map((convertedFile) => ({
            id: nanoid(),
            img: convertedFile,
          })),
        ]);
      }
    } catch (error) {
      toast({
        title: 'Oops. Something went wrong!',
        description:
          'An error occurred while processing photos to upload them, please try again or select another file for this image',
        variant: 'destructive',
      });
    }
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
    const convertedFile = await convertImgToBase64(file);

    if (convertedFile) {
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
    }
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
      const oldIndex = currentValues?.findIndex((page) => page.id === active.id);
      const newIndex = currentValues?.findIndex((page) => page.id === over.id);

      const newArray = arrayMove(currentValues, oldIndex, newIndex);

      onChange(newArray);
    }
  };

  return (
    <>
      {showKeyboardRecommend && <DndKeyboardRecommendAlert />}
      <Form {...form}>
        <form
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className='flex flex-col gap-2'
        >
          <div className='flex flex-col gap-2 md:flex-row'>
            <FormItem className='w-full'>
              <FormLabel
                isRequired
                className={cn(!!form.formState.errors.number && 'text-destructive')}
              >
                Number
              </FormLabel>
              <FormControl>
                <Input
                  aria-invalid={!!form.formState.errors.number}
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
                  <FormLabel isRequired>
                    Pages{' '}
                    <span className='text-sm text-muted-foreground'>
                      (no more than {LIMITS.pagePerChapter})
                    </span>
                  </FormLabel>
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
                <ul className='flex flex-wrap items-center gap-2 overflow-hidden'>
                  <DndContext
                    sensors={sensors}
                    autoScroll={{ layoutShiftCompensation: false }}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) =>
                      onDragEnd({ e, currentValues: field.value, onChange: field.onChange })
                    }
                  >
                    <SortableContext items={field.value}>
                      {field.value.map((page, i) => (
                        <li key={page.id}>
                          <SortablePage
                            {...page}
                            pageNumber={i + 1}
                            onClickDelete={(deletedId) =>
                              field.onChange(
                                field.value.filter((page) => page.id !== deletedId)
                              )
                            }
                            onClickEditPage={(changeId, selectedFile) =>
                              void onClickEditPage({
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
                  {field.value.length < LIMITS.pagePerChapter && (
                    <li key='control'>
                      <FormControl>
                        <FileDialog
                          maxFiles={LIMITS.pagePerChapter}
                          onSelectFiles={(selectedFiles) =>
                            void onClickUploadPage({
                              files: selectedFiles,
                              onChange: field.onChange,
                              currentValues: field.value,
                            })
                          }
                        >
                          <div className='relative flex h-[270px] w-[210px] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded border bg-background p-2 transition-colors hover:bg-muted'>
                            <Icons.uploadCloud className='h-10 w-10' />
                            <span className='text-center text-sm font-medium'>
                              Click to upload page for the comic
                            </span>
                          </div>
                        </FileDialog>
                      </FormControl>
                    </li>
                  )}
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
    </>
  );
};
