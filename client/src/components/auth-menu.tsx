'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export const AuthMenu: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return user ? (
    <Avatar>
      <AvatarImage
        src='https://i.pinimg.com/564x/9b/3f/e2/9b3fe2b12cdd77e50f94aac698e4318a.jpg'
        alt='your avatar'
      />
      <AvatarFallback>YOU</AvatarFallback>
    </Avatar>
  ) : (
    <Link href='/signIn'>
      <Button className=''>Sign In</Button>
    </Link>
  );
};
