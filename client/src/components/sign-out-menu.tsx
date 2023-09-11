'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { useActions } from '@/hooks/use-actions';
import { toast } from '@/hooks/use-toast';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { AuthService } from '@/services/auth.service';

export const SignOutMenu: FC = ({}) => {
  const router = useRouter();
  const { setUser } = useActions();

  const { mutate: logOut, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.me],
    mutationFn: async () => {
      return await AuthService.signOut();
    },
    onSuccess: () => {
      setUser(null);
      toast({
        title: 'Congratulations!!',
        description: 'You have successfully logged out of your account',
      });
      router.refresh();
      router.push('/');
    },
    onError: (err) => {
      handleErrorMutation(err);
    },
  });

  return (
    <div className='flex gap-2'>
      <Button onClick={() => router.back()}>Back</Button>
      <Button onClick={() => logOut()} variant='ghost' isLoading={isLoading}>
        Sign Out
      </Button>
    </div>
  );
};
