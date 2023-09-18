'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { PasswordInput } from '@/components/password-input';
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
import { ISignInFields, signInValidation } from '@/lib/validators/auth.validators';
import { AuthService } from '@/services/auth.service';
import { IInvalidResponse } from '@/types/response.types';

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<ISignInFields>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: async ({ login, password }: ISignInFields) => {
      const payload: ISignInFields = {
        login,
        password,
      };

      return await AuthService.auth('signIn', payload);
    },
    onSuccess: () => {
      form.reset();
      router.refresh();
      router.replace('/');
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          const detailsResponse = (err.response.data as IInvalidResponse)?.details;

          if (detailsResponse) {
            detailsResponse.forEach((detail) => {
              if (detail.path === 'login') {
                form.setError('login', {
                  type: 'server',
                  message: detail.msg,
                });
              } else if (detail.path === 'password') {
                form.setError('password', {
                  type: 'server',
                  message: detail.msg,
                });
              }
            });
          }

          return;
        } else if (err.response?.status === 404) {
          return form.setError('login', {
            type: 'server',
            message: 'Account with this username does not exist',
          });
        } else if (err.response?.status === 409) {
          return form.setError('password', {
            type: 'server',
            message: 'You entered the wrong password',
          });
        }
      }
      toast({
        variant: 'destructive',
        title: 'Oops, something went wrong while logging in.',
        description: 'Please double check your input or try again later.',
      });
    },
  });

  const onSubmit = (data: ISignInFields) => {
    signIn(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='space-y-2'
      >
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input placeholder='alex123' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='*******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' isLoading={isLoading}>
          Sign In
        </Button>
      </form>
    </Form>
  );
};
