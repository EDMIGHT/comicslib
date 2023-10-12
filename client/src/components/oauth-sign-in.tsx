'use client';

import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { OAuthUrlHelper } from '@/lib/helpers/oauth-urls.helper';
import { cn } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import { IOAuthProvider } from '@/types/auth.types';

type OAuthSignInProps = HTMLAttributes<HTMLDivElement>;

type IProvider = {
  title: string;
  icon: keyof typeof Icons;
  endpoint: IOAuthProvider;
};

const providers: IProvider[] = [
  {
    title: 'Google',
    icon: 'google',
    endpoint: 'google',
  },
  {
    title: 'Github',
    icon: 'github',
    endpoint: 'github',
  },
];

export const OAuthSignIn: FC<OAuthSignInProps> = ({ className, ...rest }) => {
  const router = useRouter();

  const handle = (endpoint: IOAuthProvider) => {
    switch (endpoint) {
      case 'google': {
        router.push(OAuthUrlHelper.Google());
        break;
      }
      case 'github': {
        router.push(OAuthUrlHelper.Github());
        break;
      }
    }
  };

  return (
    <div {...rest} className={cn('flex gap-2', className)}>
      {providers.map(({ title, icon, endpoint }, i) => {
        const Icon = Icons[icon];

        return (
          <Button
            key={i}
            onClick={() => handle(endpoint)}
            className='basis-1/2 gap-1'
            variant='outline'
          >
            <Icon className='h-4 w-4' /> {title}
          </Button>
        );
      })}
    </div>
  );
};
