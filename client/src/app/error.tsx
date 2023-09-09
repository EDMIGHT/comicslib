'use client';

import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Shell } from '@/components/ui/shell';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error: FC<ErrorProps> = ({ reset }) => {
  return (
    <Shell variant='centered' className='max-w-md text-center'>
      <Icons.fatalError className='h-20 w-20 stroke-active' />
      <h1 className='text-3xl font-bold'>Oops, something went wrong</h1>
      <p className='text-center text-muted-foreground'>
        The app seems to be broken, please refresh the page or use the button below
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </Shell>
  );
};

export default Error;
