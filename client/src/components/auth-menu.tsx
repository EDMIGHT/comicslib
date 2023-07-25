'use client';

import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/reduxHooks';

const AuthMenu = () => {
  const { user } = useAppSelector((state) => state.auth);

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

export default AuthMenu;
