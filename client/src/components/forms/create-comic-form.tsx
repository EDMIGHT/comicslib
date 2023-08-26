'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FileDialog } from '@/components/file-dialog';
import { AuthorSearchSkeletons } from '@/components/skeletons/author-search-skeletons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { HREFS } from '@/configs/href.configs';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from '@/hooks/use-toast';
import { convertFileToBase64 } from '@/lib/helpers/convertToBase64';
import { cn } from '@/lib/utils';
import { createComicSchema, ICreateComicFields } from '@/lib/validators/comic.validators';
import { AuthorsService } from '@/services/authors.service';
import { ComicsService } from '@/services/comics.service';
import { IGenre } from '@/types/genre.types';
import { IStatus } from '@/types/status.types';
import { ITheme } from '@/types/theme.types';

type CreateComicFormProps = {
  statuses: IStatus[];
  genres: IGenre[];
  themes: ITheme[];
};

export const CreateComicForm: FC<CreateComicFormProps> = ({ statuses, genres, themes }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebounce(value, 500);
  const searchAuthorContentRef = useClickOutside(() => setOpen(false));

  const form = useForm<ICreateComicFields>({
    resolver: zodResolver(createComicSchema),
    defaultValues: {
      title: '',
      desc: '',
      statusId: statuses[0].id,
      authors: [],
      genres: [],
      themes: [],
    },
  });

  const {
    data: authors,
    isLoading: isLoadingAuthors,
    isError: isErrorAuthors,
    isSuccess: isSuccessAuthors,
  } = useQuery({
    queryKey: ['authors', debounced],
    queryFn: async () => {
      if (debounced) {
        const { authors } = await AuthorsService.getAll({ limit: 5, login: debounced });
        return authors;
      }
      return [];
    },
    onError: () => {
      return toast({
        title: 'Oops. Something went wrong!',
        description:
          'An error occurred while trying to search for the author behind your entered values, please try again later',
        variant: 'destructive',
      });
    },
  });

  const { mutate: createComic, isLoading: isLoadingCreateComic } = useMutation({
    mutationKey: ['comics'],
    mutationFn: async (data: ICreateComicFields) => {
      return await ComicsService.create(data);
    },
    onSuccess: ({ id, title }) => {
      toast({
        title: 'Congratulations!!',
        description: `You have successfully created a comic: "${title}"`,
      });
      router.replace(`${HREFS.comics}/${id}`);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            variant: 'destructive',
            title: 'Authorization Error',
            description: 'Please login or refresh the page',
          });
        } else if (err.response?.status === 400) {
          return toast({
            variant: 'destructive',
            title: 'Incorrectly entered data',
            description:
              'An error occurred while validating the data you entered, please check that you entered for correctness',
          });
        }
      }
      return toast({
        variant: 'destructive',
        title: 'Oops. Something went wrong!',
        description: 'Something went wrong, please try again later',
      });
    },
  });

  const onSelectFile = async (onChangeHandler: (...event: any[]) => void, file: File) => {
    const imageBASE64 = await convertFileToBase64(file);

    if (!imageBASE64) {
      return toast({
        title: 'Oops. Something went wrong!',
        description:
          'An error occurred while processing the uploaded image, please try again later',
        variant: 'destructive',
      });
    }
    return onChangeHandler(imageBASE64);
  };
  const onSubmit = (data: ICreateComicFields) => createComic(data);

  return (
    <Form {...form}>
      <form
        id='create-comic-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <div className='grid grid-cols-[200px_1fr] gap-2'>
          <FormField
            control={form.control}
            name='img'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileDialog
                    onSelectFile={(selectedFile) => onSelectFile(field.onChange, selectedFile)}
                  >
                    <div className='relative flex h-[270px] w-[200px] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded border p-2 transition-colors hover:bg-muted'>
                      <Icons.upload className='h-10 w-10' />
                      {field.value && (
                        <Image
                          src={field.value}
                          alt='uploaded img'
                          className='z-10 object-cover'
                          fill
                        />
                      )}
                      <span className='text-center text-sm font-medium'>
                        Click to upload cover of the comic
                      </span>
                    </div>
                  </FileDialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Title name</FormLabel>
                  <FormControl>
                    <Input placeholder='enter title name..' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-wrap items-start gap-2'>
              <FormField
                control={form.control}
                name='releasedAt'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Publication Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Icons.calendar className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='statusId'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel isRequired>Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value: typeof field.value) => field.onChange(value)}
                      >
                        <SelectTrigger className='px-5 capitalize'>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {statuses.map((status) => (
                              <SelectItem
                                key={status.id}
                                value={status.id}
                                className='capitalize'
                              >
                                {status.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='relative'>
              <FormField
                control={form.control}
                name='authors'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authors</FormLabel>

                    <FormControl>
                      <Input
                        placeholder='enter login author..'
                        value={value}
                        className='w-[240px]'
                        onClick={() => {
                          if (!open) {
                            setOpen(true);
                          }
                        }}
                        onChange={(e) => {
                          setValue(e.target.value);
                          setOpen(true);
                        }}
                      />
                    </FormControl>

                    {open && debounced && (
                      <div
                        ref={searchAuthorContentRef}
                        className={cn(
                          'absolute z-50 min-w-[240px] rounded-md border bg-popover p-1 px-2 text-popover-foreground shadow-md outline-none '
                        )}
                      >
                        <ul className='flex flex-col gap-1'>
                          {isSuccessAuthors &&
                            (authors && authors.length > 0 ? (
                              authors.map((author) => (
                                <li key={author.id}>
                                  <button
                                    onClick={() => {
                                      if (field.value?.some((val) => val === author.login)) {
                                        field.onChange(
                                          field.value.filter((val) => val !== author.login)
                                        );
                                      } else {
                                        field.onChange([...field.value, author.login]);
                                      }
                                      setOpen(false);
                                    }}
                                    className={cn(
                                      'w-full cursor-pointer rounded p-1 px-2 text-start text-sm font-medium transition-colors ',
                                      field.value?.some(
                                        (activeAuthor) => activeAuthor === author.login
                                      )
                                        ? 'bg-active text-active-foreground'
                                        : 'hover:bg-muted/80 '
                                    )}
                                  >
                                    {author.login}
                                  </button>
                                </li>
                              ))
                            ) : (
                              <li>
                                <h4 className='text-center text-base'>empty</h4>
                              </li>
                            ))}
                          {(isLoadingAuthors || isErrorAuthors) && (
                            <AuthorSearchSkeletons count={5} />
                          )}
                        </ul>
                      </div>
                    )}

                    {field.value.length > 0 && (
                      <ul className='flex flex-wrap gap-1'>
                        {field.value.map((author) => (
                          <li key={author}>
                            <Badge
                              variant='active'
                              onClick={() => {
                                field.onChange(field.value.filter((val) => val !== author));
                              }}
                            >
                              {author}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='desc'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='enter title description..' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='genres'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Genres</FormLabel>
                <div className='flex gap-1'>
                  {genres.map((gen) => (
                    <FormField
                      key={gen.id}
                      control={form.control}
                      name='genres'
                      render={({ field }) => (
                        <FormItem key={gen.id}>
                          <FormControl>
                            <Badge
                              variant={
                                field.value?.some((val) => val === gen.id)
                                  ? 'active'
                                  : 'default'
                              }
                              onClick={() => {
                                if (field.value?.some((val) => val === gen.id)) {
                                  return field.onChange(
                                    field.value.filter((val) => val !== gen.id)
                                  );
                                } else {
                                  return field.onChange([...field.value, gen.id]);
                                }
                              }}
                            >
                              {gen.title}
                            </Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='themes'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Themes</FormLabel>
                <div className='flex gap-1'>
                  {themes.map((them) => (
                    <FormField
                      key={them.id}
                      control={form.control}
                      name='themes'
                      render={({ field }) => (
                        <FormItem key={them.id}>
                          <FormControl>
                            <Badge
                              variant={
                                field.value?.some((val) => val === them.id)
                                  ? 'active'
                                  : 'default'
                              }
                              onClick={() => {
                                if (field.value?.some((val) => val === them.id)) {
                                  return field.onChange(
                                    field.value.filter((val) => val !== them.id)
                                  );
                                } else {
                                  return field.onChange([...field.value, them.id]);
                                }
                              }}
                            >
                              {them.title}
                            </Badge>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex justify-end gap-2'>
          <Button variant='outline' type='button' onClick={() => router.back()}>
            Cancel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button isLoading={isLoadingCreateComic}>Create</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will not be able to cancel the creation of a comic, so please make sure
                  that it complies with{' '}
                  <Link
                    href={HREFS.infoPage.rules}
                    className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
                  >
                    the rules of the site
                  </Link>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  type='submit'
                  form='create-comic-form'
                  disabled={isLoadingCreateComic}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
    </Form>
  );
};
