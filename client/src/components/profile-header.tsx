'use client';

import { format } from 'date-fns';
import { FC } from 'react';

import { EditProfileForm } from '@/components/forms/edit-profile-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IUser } from '@/types/user.types';

type ProfileHeaderProps = {
  user: IUser;
  currentUser: IUser | null;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({ user, currentUser }) => {
  return currentUser?.login !== user.login ? (
    <div className='flex flex-col items-start justify-center gap-1'>
      <h1 className='text-4xl font-semibold'>{user.login}</h1>
      <h2 className='text-sm text-foreground/75'>
        registered on {format(new Date(user.createdAt), 'PPP')}
      </h2>
    </div>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <button className='my-auto flex h-fit w-fit flex-col items-start gap-1 hover:brightness-75'>
          <h1 className='text-4xl font-semibold'>{user.login}</h1>
          <h2 className='text-sm text-foreground/75'>
            registered on {format(new Date(user.createdAt), 'PPP')}
          </h2>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile details</DialogTitle>
        </DialogHeader>
        <EditProfileForm user={user} currentUser={currentUser} />
      </DialogContent>
    </Dialog>
  );
};
