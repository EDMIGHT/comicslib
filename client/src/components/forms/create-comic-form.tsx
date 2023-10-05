'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { AuthorsFiltering } from '@/components/authors-filtering';
import { FileDialog } from '@/components/file-dialog';
import { GenresList } from '@/components/genres-list';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { ThemesList } from '@/components/themes-list';
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
import { toast } from '@/hooks/use-toast';
import { convertImgToBase64 } from '@/lib/helpers/convertImgToBase64';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { cn } from '@/lib/utils';
import { createComicSchema, ICreateComicFields } from '@/lib/validators/comic.validators';
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

  const { mutate: createComic, isLoading: isLoadingCreateComic } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.comics],
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
      handleErrorMutation(err);
    },
  });

  const onSelectFile = async (onChangeHandler: (...event: unknown[]) => void, file: File) => {
    const imageBASE64 = await convertImgToBase64(file);

    if (imageBASE64) {
      onChangeHandler(imageBASE64);
    }
  };
  const onSubmit = (data: ICreateComicFields) => createComic(data);

  return (
    <Form {...form}>
      <form
        id='create-comic-form'
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='space-y-2'
      >
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-[200px_1fr]'>
          <FormField
            control={form.control}
            name='img'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileDialog
                    onSelectFiles={(selectedFile) =>
                      void onSelectFile(field.onChange, selectedFile[0])
                    }
                  >
                    <div className='group relative mx-auto flex h-[270px] w-[200px] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded border p-2 transition-colors hover:bg-muted sm:mx-0'>
                      <Icons.uploadCloud className='h-10 w-10' />
                      {field.value && (
                        <>
                          <Image
                            src={field.value}
                            alt='uploaded img'
                            className='z-10 object-cover  transition-all group-hover:brightness-75'
                            fill
                          />
                          <Icons.edit className='absolute left-1/2 top-1/2 z-20 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100' />
                        </>
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
                    <FormLabel isRequired>Release Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[260px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>pick a release date</span>
                          )}
                          <Icons.calendar className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align='start' className=' w-auto p-0'>
                        <Calendar
                          mode='single'
                          captionLayout='dropdown-buttons'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          fromYear={1960}
                          toYear={2030}
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
                    <FormLabel isRequired>Authors</FormLabel>

                    <AuthorsFiltering
                      createAuthorAbility
                      activeAuthors={field.value}
                      onClick={(author) => {
                        if (field.value?.some((val) => val === author.login)) {
                          field.onChange(field.value.filter((val) => val !== author.login));
                        } else {
                          field.onChange([...field.value, author.login]);
                        }
                      }}
                    />

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
                <GenresList
                  genres={genres}
                  activeGenres={field.value}
                  onClickItem={(gen) => {
                    if (field.value?.some((val) => val === gen.title)) {
                      return field.onChange(field.value.filter((val) => val !== gen.title));
                    } else {
                      return field.onChange([...field.value, gen.title]);
                    }
                  }}
                />
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
                <ThemesList
                  themes={themes}
                  activeThemes={field.value}
                  onClickItem={(them) => {
                    if (field.value?.some((val) => val === them.title)) {
                      return field.onChange(field.value.filter((val) => val !== them.title));
                    } else {
                      return field.onChange([...field.value, them.title]);
                    }
                  }}
                />
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
