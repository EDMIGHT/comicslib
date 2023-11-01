'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
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
import { PLACEHOLDERS } from '@/configs/site.configs';
import { useActions } from '@/hooks/use-actions';
import { toast } from '@/hooks/use-toast';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { getRandomNumber } from '@/lib/utils';
import { ISignInFields, signInValidation } from '@/lib/validators/auth.validators';
import { AuthService } from '@/services/auth.service';
import { isInvalidResponseWithDetails } from '@/types/response.types';

export const SignInForm = () => {
  const router = useRouter();
  const { setUser } = useActions();

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
    onSuccess: (payload) => {
      console.log(payload);
      setUser(payload);
      form.reset();
      router.refresh();
      router.replace('/');
    },
    onError: (err) => {
      ErrorHandler.mutation(err, {
        validError: {
          withToast: false,
          action: (err) => {
            if (isInvalidResponseWithDetails(err.data)) {
              const { details } = err.data;
              const allFields = form.watch();

              details.forEach((detail) => {
                if (allFields.hasOwnProperty(detail.path)) {
                  form.setError(detail.path as keyof ISignInFields, {
                    type: 'server',
                    message: detail.msg,
                  });
                } else {
                  toast({
                    variant: 'destructive',
                    title: 'Validation error not from form',
                    description: detail.msg,
                  });
                }
              });
            } else {
              toast({
                variant: 'destructive',
                title: 'Validation error',
                description: `A validation error occurred that was not caused by the server`,
              });
            }
          },
        },
        notFoundError: {
          withToast: false,
          action: () => {
            return form.setError('login', {
              type: 'server',
              message: 'Account with this username does not exist',
            });
          },
        },
        conflictError: {
          withToast: false,
          action: () => {
            return form.setError('password', {
              type: 'server',
              message: 'You entered the wrong password',
            });
          },
        },
      });
    },
  });

  const onSubmit = (data: ISignInFields) => {
    signIn(data);
  };

  const memoizedLoginPlaceholder = useMemo(
    () =>
      PLACEHOLDERS.userLogin[
        getRandomNumber({
          min: 0,
          max: PLACEHOLDERS.userLogin.length - 1,
          inclusive: true,
        })
      ],
    []
  );

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
                <Input placeholder={memoizedLoginPlaceholder} {...field} />
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
