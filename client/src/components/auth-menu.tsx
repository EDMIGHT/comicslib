import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { getAuthServer } from '@/lib/helpers/getAuthServer';

import { UserAvatar } from './user-avatar';

export const AuthMenu = async () => {
  const user = await getAuthServer();

  return user ? (
    <UserAvatar user={user} />
  ) : (
    <Link href='/sign-in' className={buttonVariants()}>
      Sign In
    </Link>
  );
};
