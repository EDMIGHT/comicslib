'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

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
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
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
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createAuthor, isLoading } = useMutation({
    mutationKey: ['authors'],
    mutationFn: async (payload: ICreateAuthorFields) => {
      return await AuthorsService.create(payload);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
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
    console.log(data);
    createAuthor(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
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
        <Button isLoading={isLoading} className='ml-auto'>
          Create
        </Button>
      </form>
    </Form>
  );
};
