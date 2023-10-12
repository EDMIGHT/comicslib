'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { handleErrorMutation } from '@/lib/handleErrorMutation';
import { createAuthorSchema, ICreateAuthorFields } from '@/lib/validators/author.validators';
import { AuthorsService } from '@/services/authors.service';

type CreateAuthorFormProps = {
  initialLogin?: string;
  handleSuccess?: () => void;
};

export const CreateAuthorForm: FC<CreateAuthorFormProps> = ({
  initialLogin = '',
  handleSuccess,
}) => {
  const form = useForm<ICreateAuthorFields>({
    resolver: zodResolver(createAuthorSchema),
    defaultValues: {
      login: initialLogin,
      name: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createAuthor, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.authors],
    mutationFn: async (payload: ICreateAuthorFields) => {
      return await AuthorsService.create(payload);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.authors] });
      toast({
        title: 'Congratulations!!',
        description: `You have successfully created an author with login: "${response.login}"`,
      });
      handleSuccess && handleSuccess();
    },
    onError: (err) => {
      handleErrorMutation(err);
    },
  });

  const onSubmit = (data: ICreateAuthorFields) => {
    createAuthor(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='flex flex-col gap-2'
      >
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Login (pseudonym)</FormLabel>
              <FormControl>
                <Input placeholder='enter login..' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='enter name..' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' isLoading={isLoading} className='ml-auto'>
          Create
        </Button>
      </form>
    </Form>
  );
};
