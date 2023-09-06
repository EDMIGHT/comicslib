import { FC, HTMLAttributes } from 'react';

import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { IShortUser, IUser } from '@/types/user.types';

import { ProfileEditAvatar } from './profile-edit-avatar';
import { UserAvatar } from './user-avatar';

type ProfileAvatarProps = IShortUser &
  HTMLAttributes<HTMLDivElement> & {
    currentUser: IUser | null;
  };

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
  img,
  login,
  className,
  currentUser,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn('relative h-[120px] w-[120px] md:h-[200px] md:w-[200px] group', className)}
    >
      {currentUser?.login !== login ? (
        <UserAvatar img={img} login={login} className='h-full w-full' />
      ) : (
        <ProfileEditAvatar>
          <UserAvatar
            img={img}
            login={login}
            className='h-full w-full transition-colors group-hover:brightness-50'
          />
          <Icons.camera className='absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100' />
        </ProfileEditAvatar>
      )}
    </div>
  );
};
