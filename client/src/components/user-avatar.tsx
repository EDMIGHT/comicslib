import Image from 'next/image';
import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';
import { IShortUser, IUser } from '@/types/user.types';

type UserAvatarProps = {
  user: IUser | IShortUser;
} & Partial<HTMLAttributes<HTMLDivElement>>;

export const UserAvatar: FC<UserAvatarProps> = ({ user, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        'relative h-10 w-10 overflow-hidden rounded-full object-cover object-center',
        className
      )}
    >
      {user.img ? (
        <Image src={user.img} alt={user.login} fill />
      ) : (
        <div className='absolute flex h-full w-full items-center justify-center bg-secondary text-foreground'>
          {user.login.slice(0, 2)}
        </div>
      )}
    </div>
  );
};
