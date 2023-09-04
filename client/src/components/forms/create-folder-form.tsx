'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SearchComic } from '@/components/layouts/search-comic';
import { SearchComicSkeletons } from '@/components/skeletons/search-comic-skeletons';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandInput } from '@/components/ui/command';
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
import { LIMITS } from '@/configs/site.configs';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from '@/hooks/use-toast';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { getRandomNumber } from '@/lib/utils';
import { createUserFolder, ICreateUserFolderFields } from '@/lib/validators/user.validators';
import { ComicsService } from '@/services/comics.service';
import { UserService } from '@/services/users.service';
import { IResponseComic } from '@/types/comic.types';
import { IUser } from '@/types/user.types';

type CreateFolderFormProps = {
  user: IUser;
};

const titlePlaceholders = ['reading..', 'completed..', 'in progress..', 'plan to read..'];

export const CreateFolderForm: FC<CreateFolderFormProps> = ({ user }) => {
  const [isOpenSearchDialog, setIsOpenSearchDialog] = useState(false);
  const [value, setValue] = useState('');
  const [selectedComic, setSelectedComic] = useState<IResponseComic[]>([]);
  const [debounced] = useDebounce(value, 500);
  const form = useForm<ICreateUserFolderFields>({
    resolver: zodResolver(createUserFolder),
    defaultValues: {
      title: '',
      comics: [],
    },
  });

  const resetDialog = useCallback(() => {
    setIsOpenSearchDialog(false);
    setValue('');
  }, []);

  useEffect(() => {
    if (!isOpenSearchDialog) {
      resetDialog();
    }
  }, [isOpenSearchDialog, resetDialog]);

  const {
    data: searchedComics,
    isLoading: isLoadingSearchComics,
    isSuccess: isSuccessSearchComics,
  } = useQuery({
    queryKey: ['search-comics', 'comics', debounced],
    queryFn: async () => {
      if (debounced) {
        const { comics } = await ComicsService.getAll({
          limit: LIMITS.comicsSearch,
          title: debounced,
        });
        return comics;
      }
      return null;
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Oops, something went wrong',
        description: 'An error occurred while searching, please try again later',
      });
    },
  });

  const { mutate: createFolder, isLoading: isLoadingCreateFolder } = useMutation({
    mutationKey: ['folders', 'comics'],
    mutationFn: async (data: ICreateUserFolderFields) => {
      return await UserService.createFolder(data);
    },
    onError: (err) => {
      handleErrorMutation(err, {
        forbiddenError: {
          title: 'The maximum number of folders has been reached',
          description: `You have already created ${LIMITS.folders} folders, please delete one of the old ones before creating a new one`,
        },
      });
    },
    onSuccess: (data) => {
      form.reset();
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createFolder(data);
  });

  const memoizedTitlePlaceholder = useMemo(
    () =>
      titlePlaceholders[
        getRandomNumber({
          min: 0,
          max: titlePlaceholders.length - 1,
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
                <CommandDialog open={isOpenSearchDialog} onOpenChange={setIsOpenSearchDialog}>
                  <CommandInput
                    placeholder='comic title name..'
                    value={value}
                    onValueChange={setValue}
                  />
                  {isLoadingSearchComics && (
                    <ul className='flex flex-col gap-1 p-1'>
                      <SearchComicSkeletons />
                    </ul>
                  )}
                  {isSuccessSearchComics &&
                    searchedComics &&
                    (searchedComics?.length > 0 ? (
                      <ul className='flex flex-col gap-1 p-1'>
                        {searchedComics.map((comic) => (
                          <li key={comic.id}>
                            <SearchComic
                              {...comic}
                              onClick={() => {
                                field.onChange([...field.value, comic.id]);
                                setSelectedComic((prev) => [...prev, comic]);
                                resetDialog();
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className='p-10 text-center '>
                        <h2>comics not found</h2>
                      </div>
                    ))}
                </CommandDialog>
              </FormControl>
              <ul className='grid grid-cols-3 gap-2'>
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
