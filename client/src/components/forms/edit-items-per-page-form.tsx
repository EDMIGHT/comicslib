'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LIMITS } from '@/configs/site.configs';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from '@/hooks/use-toast';
import { cn, generatePerPageVariants } from '@/lib/utils';
import { IItemsPerPageSchema, ItemsPerPageSchema } from '@/lib/validators/site.validators';

const comicsPerPageVariants = generatePerPageVariants(LIMITS.comics, 5);
const usersPerPageVariants = generatePerPageVariants(LIMITS.users, 5);

export const EditItemsPerPageForm: FC = ({}) => {
  const { countComicsPerPage, countUsersPerPage } = useAppSelector((state) => state.settings);
  const [_c, setCountComicsPerPage] = useLocalStorage(
    'countComicsPerPage',
    countComicsPerPage
  );
  const [_u, setCountUsersPerPage] = useLocalStorage('countUsersPerPage', countUsersPerPage);

  const form = useForm<IItemsPerPageSchema>({
    resolver: zodResolver(ItemsPerPageSchema),
    defaultValues: {
      comicsPerPage: countComicsPerPage,
      usersPerPage: countUsersPerPage,
    },
  });

  const onSubmit = ({ comicsPerPage, usersPerPage }: IItemsPerPageSchema) => {
    setCountComicsPerPage(comicsPerPage);
    setCountUsersPerPage(usersPerPage);
    toast({
      title: 'Congratulations!!',
      description: 'You have successfully changed the amount of content loaded per page',
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='flex w-full flex-col gap-2'
      >
        <div className='flex flex-wrap gap-4'>
          <FormField
            control={form.control}
            name='comicsPerPage'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel>Comics per page</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='w-[150px] justify-between'
                      >
                        {field.value}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[150px] p-0'>
                    <Command>
                      <CommandEmpty>Not found comics per page variants</CommandEmpty>
                      <CommandGroup>
                        {comicsPerPageVariants.map((comicVar, i) => (
                          <CommandItem
                            key={i}
                            value={comicVar.toString()}
                            onSelect={() => {
                              field.onChange(comicVar);
                            }}
                          >
                            {comicVar}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                comicVar === field.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='usersPerPage'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-1'>
                <FormLabel>Users per page</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='w-[150px] justify-between'
                      >
                        {field.value}
                        <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[150px] p-0'>
                    <Command>
                      <CommandEmpty>Not found users per page variants</CommandEmpty>
                      <CommandGroup>
                        {usersPerPageVariants.map((userVar, i) => (
                          <CommandItem
                            key={i}
                            value={userVar.toString()}
                            onSelect={() => {
                              field.onChange(userVar);
                            }}
                          >
                            {userVar}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                userVar === field.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='w-fit self-end'>
          Save
        </Button>
      </form>
    </Form>
  );
};
