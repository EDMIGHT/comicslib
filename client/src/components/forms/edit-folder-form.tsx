'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { PLACEHOLDERS } from '@/configs/site.configs';
import { getRandomNumber } from '@/lib/utils';
import { editFolderSchema, IEditFolderSchema } from '@/lib/validators/user.validators';
import { IComic, IResponseAllComics } from '@/types/comic.types';
import { IUserFolder } from '@/types/user.types';

import { Pagination } from '../ui/pagination';

type EditFolderFormProps = {
  folder: IUserFolder;
  responseComics: IResponseAllComics;
};

export const EditFolderForm: FC<EditFolderFormProps> = ({
  folder,
  responseComics: { comics, totalPages, currentPage },
}) => {
  const form = useForm<IEditFolderSchema>({
    resolver: zodResolver(editFolderSchema),
    defaultValues: {
      title: folder.title,
      comics: [],
    },
  });

  const onSubmit = void form.handleSubmit((data) => {
    console.log(data);
  });

  const memoizedTitlePlaceholder = useMemo(
    () =>
      PLACEHOLDERS.folderTitle[
        getRandomNumber({
          min: 0,
          max: PLACEHOLDERS.folderTitle.length - 1,
          inclusive: true,
        })
      ],
    []
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='flex flex-col gap-2'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder={memoizedTitlePlaceholder} {...field} />
              </FormControl>
              <FormDescription>Name for your folder</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='comics'
          render={({ field }) => (
            <FormItem className='space-y-2'>
              <FormControl>
                <ul className='grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                  {comics.map(({ id, img, title }) => {
                    const isDeleted = field.value?.some((val) => val === id);

                    return (
                      <li key={id} className='relative h-[300px] overflow-hidden rounded'>
                        {!isDeleted && (
                          <button
                            className='absolute right-1 top-1 rounded-full bg-destructive p-1 hover:brightness-75 focus:brightness-75'
                            type='button'
                            onClick={() => {
                              field.onChange([...field.value, id]);
                            }}
                          >
                            <Icons.delete />
                          </button>
                        )}
                        <Image
                          src={img}
                          alt={title}
                          width={300}
                          height={300}
                          className='h-full w-full object-cover object-center'
                        />
                        {isDeleted && (
                          <button
                            className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-destructive/80 text-xl font-semibold'
                            onClick={() => {
                              field.onChange(field.value.filter((val) => val !== id));
                            }}
                          >
                            will be deleted
                          </button>
                        )}
                        <h3 className='absolute inset-x-1 bottom-1 rounded-xl bg-background/80 p-2 font-medium backdrop-blur-md'>
                          {title}
                        </h3>
                      </li>
                    );
                  })}
                </ul>
              </FormControl>
              {totalPages > 1 && (
                <Pagination
                  initialLimit={currentPage}
                  totalPages={totalPages}
                  className='justify-center'
                />
              )}
            </FormItem>
          )}
        />
        <Button type='submit' className='ml-auto'>
          Save changes
        </Button>
      </form>
    </Form>
  );
};
