'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { signInValidation } from '@/lib/validations/signIn.validation';
import { IAuthQuery, useLoginMutation } from '@/services/auth.service';
import { setAuthData } from '@/store/slices/auth.slice';
import { isBadResponse } from '@/types/response.types';

export type ISignInFields = z.infer<typeof signInValidation>;

const SignInForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [globalError, setGlobalError] = useState('');
  const { toast } = useToast();
  const form = useForm<ISignInFields>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const [login, { isLoading, isError }] = useLoginMutation();

  useEffect(() => {
    if (globalError && isError) {
      toast({
        variant: 'destructive',
        title: 'Oops, something went wrong while logging in.',
        description: globalError,
      });
    }
  }, [isError, globalError]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = (await login(data)) as IAuthQuery;

      if (isBadResponse(response)) {
        setGlobalError(response.error.data.message);
      } else if (response.data) {
        dispatch(setAuthData(response.data));

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        router.push('/');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Oops, something went wrong while logging in.',
        description: 'Please double check your input or try again later.',
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-2'>
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem>
              <FormLabel>login</FormLabel>
              <FormControl>
                <Input placeholder='write login here..' {...field} />
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder='write password here..' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading && <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />}
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
