'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import { useActions } from '@/hooks/use-actions';
import { toast } from '@/hooks/use-toast';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { cn } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';

type SignOutMenuProps = HTMLAttributes<HTMLDivElement>;

export const SignOutMenu: FC<SignOutMenuProps> = ({ className, ...rest }) => {
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
      router.replace('/');
    },
    onError: (err) => {
      ErrorHandler.mutation(err);
    },
  });

  return (
    <div {...rest} className={cn('flex gap-2', className)}>
      <Button onClick={() => router.back()}>Back</Button>
      <Button onClick={() => logOut()} variant='ghost' isLoading={isLoading}>
        Sign Out
      </Button>
    </div>
  );
};
