'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SearchComic } from '@/components/layouts/search-comic';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { SearchComics } from '@/components/search-comics';
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
import { Separator } from '@/components/ui/separator';
import { HREFS } from '@/configs/href.configs';
import { LIMITS, PLACEHOLDERS } from '@/configs/site.configs';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { getRandomNumber } from '@/lib/utils';
import {
  createUserFolderSchema,
  ICreateUserFolderSchema,
} from '@/lib/validators/user.validators';
import { FoldersService } from '@/services/folders.service';
import { IResponseComic } from '@/types/comic.types';

export const CreateFolderForm: FC = () => {
  const router = useRouter();
  const [isOpenSearchDialog, setIsOpenSearchDialog] = useState(false);
  const [selectedComic, setSelectedComic] = useState<IResponseComic[]>([]);
  const form = useForm<ICreateUserFolderSchema>({
    resolver: zodResolver(createUserFolderSchema),
    defaultValues: {
      title: '',
      comics: [],
    },
  });

  const { mutate: createFolder, isLoading: isLoadingCreateFolder } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.folders, REACT_QUERY_KEYS.comics],
    mutationFn: async (data: ICreateUserFolderSchema) => {
      return await FoldersService.createFolder(data);
    },
    onError: (err) => {
      ErrorHandler.mutation(err, {
        forbiddenError: {
          title: 'The maximum number of folders has been reached',
          description: `You have already created ${LIMITS.folders} folders, please delete one of the old ones before creating a new one`,
        },
      });
    },
    onSuccess: (res) => {
      router.refresh();
      router.push(`${HREFS.library.folders}/${res.id}`);
      form.reset();
    },
  });

  const onSubmit = (data: ICreateUserFolderSchema) => {
    createFolder(data);
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
        // https://stackoverflow.com/questions/74190256/eslint-promise-returning-function-provided-to-attribute-where-a-void-return-was
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
            <FormItem className='flex flex-col gap-2'>
              <Button
                type='button'
                onClick={() => setIsOpenSearchDialog(true)}
                variant='ghost'
                className=' font-semibold text-active'
              >
                Add some titles
              </Button>
              <Separator />
              <FormControl>
                <SearchComics
                  open={isOpenSearchDialog}
                  setOpen={setIsOpenSearchDialog}
                  onClickItem={(comic) => {
                    if (field.value.find((addedComicId) => addedComicId === comic.id)) {
                      field.onChange(field.value.filter((comicId) => comicId !== comic.id));
                      setSelectedComic((prev) =>
                        prev.filter((prevComic) => prevComic.id !== comic.id)
                      );
                    } else {
                      field.onChange([...field.value, comic.id]);
                      setSelectedComic((prev) => [...prev, comic]);
                    }
                  }}
                />
              </FormControl>
              <ul className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                {selectedComic.map((comic) => (
                  <li key={comic.id} className='relative'>
                    <Link href={`${HREFS.comics}/${comic.id}`}>
                      <SearchComic {...comic} className='bg-card' />
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        field.onChange(field.value.filter((val) => val !== comic.id));
                        setSelectedComic((prev) =>
                          prev.filter((selected) => selected.id !== comic.id)
                        );
                      }}
                      className='absolute right-1 top-1'
                    >
                      <Icons.delete className='cursor-pointer hover:stroke-destructive' />
                    </button>
                  </li>
                ))}
              </ul>
            </FormItem>
          )}
        />
        <Button type='submit' isLoading={isLoadingCreateFolder} className='w-fit self-end'>
          Create
        </Button>
      </form>
    </Form>
  );
};
