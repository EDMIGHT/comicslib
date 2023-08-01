import Image from 'next/image';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getAuthServer } from '@/lib/helpers/getAuthServer';

export const AuthMenu = async () => {
  const user = await getAuthServer();

  return user ? (
    <Avatar>
      {user.img ? (
        <Image src={user.img} alt='your avatar' fill />
      ) : (
        <AvatarFallback>YOU</AvatarFallback>
      )}
    </Avatar>
  ) : (
    <Button className=''>Sign In</Button>
  );
};
