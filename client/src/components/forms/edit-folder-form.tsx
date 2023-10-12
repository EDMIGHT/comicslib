'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
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
import { Pagination } from '@/components/ui/pagination';
import { HREFS } from '@/configs/href.configs';
import { PLACEHOLDERS } from '@/configs/site.configs';
import { toast } from '@/hooks/use-toast';
import { handleErrorMutation } from '@/lib/handleErrorMutation';
import { getRandomNumber } from '@/lib/utils';
import { editFolderSchema, IEditFolderSchema } from '@/lib/validators/user.validators';
import { FoldersService } from '@/services/folders.service';
import { IResponseAllComics } from '@/types/comic.types';
import { IUserFolder } from '@/types/user.types';

type EditFolderFormProps = {
  folder: IUserFolder;
  responseComics: IResponseAllComics;
};

export const EditFolderForm: FC<EditFolderFormProps> = ({
  folder,
  responseComics: { comics, totalPages, currentPage },
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<IEditFolderSchema>({
    resolver: zodResolver(editFolderSchema),
    defaultValues: {
      title: folder.title,
      comics: [],
    },
  });

  const { mutate: editFolder, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.folders],
    mutationFn: async ({ title, comics }: IEditFolderSchema) => {
      return await FoldersService.updateFolder(folder.id, { title, comics });
    },
    onSuccess: (res) => {
      form.reset();
      router.refresh();
      toast({
        title: 'Congratulations!!',
        description: `You have successfully updated a folder named: "${res.title}"`,
      });
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.folders] });
      form.setValue('title', res.title);
    },
    onError: (err) => {
      handleErrorMutation(err, {
        forbiddenError: {
          title: 'Access error',
          description: 'You are not the owner of this folder to edit it',
        },
      });
    },
  });

  const onSubmit = (data: IEditFolderSchema) => {
    editFolder(data);
  };

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
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='flex flex-col gap-2'
      >
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
              <FormLabel>Titles</FormLabel>

              <ul className='grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {comics.map(({ id, img, title }) => {
                  const isDeleted = field.value?.some((val) => val === id);

                  return (
                    <li
                      key={id}
                      className='relative h-[250px] overflow-hidden rounded md:h-[300px]'
                    >
                      {!isDeleted && (
                        <button
                          className='absolute right-1 top-1 z-10 rounded-full bg-destructive p-1 hover:brightness-75 focus:brightness-75'
                          type='button'
                          onClick={() => {
                            field.onChange([...field.value, id]);
                          }}
                        >
                          <Icons.delete />
                        </button>
                      )}
                      {isDeleted && (
                        <button
                          className='absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-destructive/80 text-xl font-semibold'
                          onClick={() => {
                            field.onChange(field.value.filter((val) => val !== id));
                          }}
                        >
                          will be deleted
                        </button>
                      )}
                      <Link href={`${HREFS.comics}/${id}`} className='group'>
                        <Image
                          src={img}
                          alt={title}
                          width={300}
                          height={300}
                          className='h-full w-full object-cover object-center group-hover:brightness-75 group-focus:brightness-75'
                        />
                        <h3 className='absolute inset-x-1 bottom-1 z-10 rounded-xl bg-background/80 p-2 text-center font-medium backdrop-blur-md '>
                          {title}
                        </h3>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  className='justify-center'
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='ml-auto' isLoading={isLoading}>
          Save changes
        </Button>
      </form>
    </Form>
  );
};
