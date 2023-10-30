'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { PasswordInput } from '@/components/password-input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HREFS } from '@/configs/href.configs';
import { PLACEHOLDERS } from '@/configs/site.configs';
import { useActions } from '@/hooks/use-actions';
import { toast } from '@/hooks/use-toast';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { cn, getRandomNumber } from '@/lib/utils';
import { ISignUpFields, signUpValidation } from '@/lib/validators/auth.validators';
import { AuthService, IRequestSignUpBody } from '@/services/auth.service';
import { isInvalidResponseWithDetails } from '@/types/response.types';

export const SignUpForm = () => {
  const router = useRouter();
  const { setUser } = useActions();

  const form = useForm<ISignUpFields>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: async ({ login, password }: IRequestSignUpBody) => {
      const payload: IRequestSignUpBody = {
        login,
        password,
      };

      return await AuthService.auth('signUp', payload);
    },
    onSuccess: ({ user }) => {
      setUser(user);
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
                  form.setError(detail.path as keyof ISignUpFields, {
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
        conflictError: {
          withToast: false,
          action: () => {
            return form.setError('login', {
              type: 'server',
              message: 'An account with this login already exists',
            });
          },
        },
      });
    },
  });

  const onSubmit = (data: ISignUpFields) => {
    signUp(data);
    form.reset();
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='*******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='terms'
          render={({ field }) => (
            <FormItem>
              <div className='flex flex-row items-center justify-start space-x-2 pl-2'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className='leading-none'>
                  <FormLabel className='p-0'>
                    I&apos;ve read and agree to the{' '}
                    <Link
                      href={HREFS.infoPage.privacyPolicy}
                      className={cn(
                        buttonVariants({ variant: 'link' }),
                        'p-0 text-active h-fit'
                      )}
                    >
                      Privacy Policy
                    </Link>
                  </FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' isLoading={isLoading}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
