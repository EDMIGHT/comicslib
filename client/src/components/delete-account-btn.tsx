'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useActions } from '@/hooks/use-actions';
import { toast } from '@/hooks/use-toast';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { UsersService } from '@/services/users.service';

type DeleteAccountBtnProps = HTMLAttributes<HTMLButtonElement>;

export const DeleteAccountBtn: FC<DeleteAccountBtnProps> = ({ className, ...rest }) => {
  const router = useRouter();
  const { setUser } = useActions();

  const { mutate: deleteAccount, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.me, REACT_QUERY_KEYS.users],
    mutationFn: async () => {
      return await UsersService.deleteAccount();
    },
    onSuccess: () => {
      toast({
        title: 'Congratulations!!',
        description: 'You have successfully deleted your account',
      });
      setUser(null);
      router.refresh();
      router.replace('/');
    },
    onError: (err) => {
      ErrorHandler.mutation(err, {
        notFoundError: {
          title: 'Account has already been deleted',
          description: 'You may have used an out-of-date page',
        },
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...rest} className={className} variant='destructive' isLoading={isLoading}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Account deletion cannot be undone and your information will be completely deleted
            from our servers, but your downloaded chapters will remain
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteAccount()} disabled={isLoading}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
