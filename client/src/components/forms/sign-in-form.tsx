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
      router.refresh();
      router.replace('/');
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            variant: 'destructive',
            title: 'Invalid request body',
            description:
              (err.response.data as IInvalidResponse)?.details[0]?.msg ||
              'Check the correctness of the entered data',
          });
        } else if (err.response?.status === 404) {
          return toast({
            variant: 'destructive',
            title: 'Account not found',
            description: 'Account with this username does not exist',
          });
        } else if (err.response?.status === 409) {
          return toast({
            variant: 'destructive',
            title: 'You entered the wrong password',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Oops, something went wrong while logging in.',
            description: 'Please double check your input or try again later.',
          });
        }
      }
    },
  });

  const onSubmit = (data: ISignInFields) => {
    signIn(data);
    form.reset();
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
