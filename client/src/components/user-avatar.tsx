import Image from 'next/image';
import { FC } from 'react';

import { IShortUser, IUser } from '@/types/user.types';

import { Avatar, AvatarFallback } from './ui/avatar';

type UserAvatarProps = {
  user: IUser | IShortUser;
} & Partial<typeof Avatar>;

export const UserAvatar: FC<UserAvatarProps> = ({ user, ...rest }) => {
  return (
    <Avatar {...rest}>
      {user.img ? (
        <Image src={user.img} alt={`${user.login} avatar`} fill />
      ) : (
        <AvatarFallback>{user.login}</AvatarFallback>
      )}
    </Avatar>
  );
};
