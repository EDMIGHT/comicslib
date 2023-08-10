'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useActions } from '@/hooks/use-actions';
import { useToast } from '@/hooks/use-toast';
import { saveTokens } from '@/lib/helpers/token.helper';
import { signInValidation } from '@/lib/validators/auth.validators';
import { AuthService } from '@/services/auth.service';

export type ISignInFields = z.infer<typeof signInValidation>;

export const SignInForm = () => {
  const router = useRouter();
  const { setUser } = useActions();
  const { toast } = useToast();
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
      const data = await AuthService.auth('signIn', payload);

      if (data && data.accessToken) {
        saveTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
        });
        setUser(data.user);
      }

      return data;
    },
    onSuccess: () => {
      router.back();
      router.refresh();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            variant: 'destructive',
            title: 'Invalid request body',
            description:
              err.response.data?.details[0]?.msg ||
              'Check the correctness of the entered data',
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

  const onSubmit = form.handleSubmit(async (data) => {
    signIn(data);
    form.reset();
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
        <Button type='submit' className='w-full' isLoading={isLoading}>
          Sign In
        </Button>
      </form>
    </Form>
  );
};