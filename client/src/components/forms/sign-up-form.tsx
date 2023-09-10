'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ISignUpFields, signUpValidation } from '@/lib/validators/auth.validators';
import { AuthService, IRequestSignUpBody } from '@/services/auth.service';
import { IInvalidResponse } from '@/types/response.types';

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<ISignUpFields>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      login: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: async ({ login, password, name }: IRequestSignUpBody) => {
      const payload: IRequestSignUpBody = {
        login,
        password,
        name,
      };

      return await AuthService.auth('signUp', payload);
    },
    onSuccess: () => {
      router.replace('/');
      router.refresh();
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
        } else if (err.response?.status === 409) {
          return toast({
            variant: 'destructive',
            title: 'Such an account already exists',
            description:
              (err.response.data as IInvalidResponse)?.details[0]?.msg ||
              'An account with this username probably already exists, please enter a different one',
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

  const onSubmit = (data: ISignUpFields) => {
    signUp(data);
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
              <FormLabel isRequired>Login</FormLabel>
              <FormControl>
                <Input placeholder='alex123' {...field} />
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
                <Input placeholder='Alex' {...field} />
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
              <FormLabel isRequired>Password</FormLabel>
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
              <FormLabel isRequired>Confirm Password</FormLabel>
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
              <div className='flex flex-row items-center justify-start space-x-2 pl-2 shadow'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className='leading-none'>
                  <FormLabel isRequired className='p-0'>
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
