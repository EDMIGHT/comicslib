import Image from 'next/image';
import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type UserAvatarProps = HTMLAttributes<HTMLDivElement> & {
  img: string;
  login: string;
};

export const UserAvatar: FC<UserAvatarProps> = ({ img, login, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full object-cover object-center',
        className
      )}
    >
      {img ? (
        <Image src={img} alt={login} fill />
      ) : (
        <div className='absolute flex h-full w-full items-center justify-center bg-secondary text-foreground'>
          {login.slice(0, 2)}
        </div>
      )}
    </div>
  );
};
