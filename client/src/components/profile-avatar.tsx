'use client';

import { FC, HTMLAttributes, useState } from 'react';

import { cn } from '@/lib/utils';
import { IShortUser, IUser } from '@/types/user.types';

import { ProfileEditAvatar } from './profile-edit-avatar';
import { Icons } from './ui/icons';
import { UserAvatar } from './user-avatar';

type ProfileAvatarProps = IShortUser &
  HTMLAttributes<HTMLDivElement> & {
    currentUser: IUser | null;
  };

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
  id,
  img,
  login,
  className,
  currentUser,
  ...props
}) => {
  const [croppedImg, setCroppedImg] = useState<File | null>(null);

  return (
    <div
      {...props}
      className={cn('relative h-[120px] w-[120px] md:h-[200px] md:w-[200px]', className)}
    >
      <UserAvatar
        img={(croppedImg && URL.createObjectURL(croppedImg)) || img}
        login={login}
        className='h-full w-full'
      />
      {currentUser?.login === login && (
        <ProfileEditAvatar onSelectFile={(file) => setCroppedImg(file)} />
      )}
    </div>
  );
};
