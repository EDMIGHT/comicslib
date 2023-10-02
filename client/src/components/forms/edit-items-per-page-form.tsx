'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { LocalStorageKeys } from '@/components/providers/local-provider';
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
import { Icons } from '@/components/ui/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LIMITS } from '@/configs/site.configs';
import { useActions } from '@/hooks/use-actions';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useMounted } from '@/hooks/use-mounted';
import { toast } from '@/hooks/use-toast';
import { cn, generatePerPageVariants } from '@/lib/utils';
import { IItemsPerPageSchema, ItemsPerPageSchema } from '@/lib/validators/site.validators';

const comicsPerPageVariants = generatePerPageVariants(LIMITS.comics, 5);
const usersPerPageVariants = generatePerPageVariants(LIMITS.users, 5);

export const EditItemsPerPageForm: FC = ({}) => {
  const mounted = useMounted();
  const { setCountsPerPage: setReduxCountsPerPage } = useActions();

  const [countComicsPerPage, setCountComicsPerPage] = useLocalStorage(
    LocalStorageKeys.countComicsPerPage,
    LIMITS.comics as number
  );
  const [countUsersPerPage, setCountUsersPerPage] = useLocalStorage(
    LocalStorageKeys.countUsersPerPage,
    LIMITS.users as number
  );

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
    setReduxCountsPerPage({
      countComicsPerPage: comicsPerPage,
      countUsersPerPage: usersPerPage,
    });
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
                        {mounted ? (
                          <>
                            {field.value}
                            <Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </>
                        ) : (
                          <Icons.loading className='mx-auto h-5 w-5 animate-spin' />
                        )}
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
                            <Icons.check
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
                        {mounted ? (
                          <>
                            {field.value}
                            <Icons.chevronUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </>
                        ) : (
                          <Icons.loading className='mx-auto h-5 w-5 animate-spin' />
                        )}
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
                            <Icons.check
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
