'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { PasswordInput } from '@/components/password-input';
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
import { toast } from '@/hooks/use-toast';
import { changePasswordSchema, IChangePasswordSchema } from '@/lib/validators/user.validators';
import { UsersService } from '@/services/users.service';

export const ChangePasswordForm: FC = ({}) => {
  const form = useForm<IChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { mutate: changePassword, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.me],
    mutationFn: async ({ newPassword, oldPassword }: IChangePasswordSchema) => {
      return await UsersService.updatePassword({
        newPassword,
        oldPassword,
      });
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: 'Congratulations!!',
        description: 'You have successfully changed your password',
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            variant: 'destructive',
            title: 'Account not found',
            description: 'This account does not exist or was created using external services',
          });
        } else if (err.response?.status === 409) {
          form.setError('oldPassword', {
            type: 'server',
            message: 'The old password entered is incorrect',
          });

          return toast({
            variant: 'destructive',
            title: 'The old password entered is incorrect',
            description: 'Please check that you entered your previous password correctly',
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

  const onSubmit = (data: IChangePasswordSchema) => {
    console.log(data);
    changePassword(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='flex w-full flex-col gap-2'
      >
        <FormField
          control={form.control}
          name='oldPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='*******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='*******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmNewPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='*******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-fit self-end' isLoading={isLoading}>
          Save
        </Button>
      </form>
    </Form>
  );
};
