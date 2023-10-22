'use client';

import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Shell } from '@/components/ui/shell';
import { extractStatusCode } from '@/lib/utils';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error: FC<ErrorProps> = ({ error, reset }) => {
  const code = extractStatusCode(error.message);

  if (code && code === 429) {
    return (
      <Shell variant='centered' className='max-w-md text-center'>
        <Icons.stopHand className='h-20 w-20 stroke-active' />
        <h1 className='text-3xl font-bold'>Stop</h1>
        <p className='text-center text-muted-foreground'>
          More than <span className='font-semibold text-foreground'>100</span> requests have
          been sent from you in the last{' '}
          <span className='font-semibold text-foreground'>5 minutes</span>, so we have
          temporarily blocked you for now, within{' '}
          <span className='font-semibold text-foreground'>
            5 minutes you will have access to the web application again
          </span>
        </p>
        <Button onClick={() => reset()}>Try again</Button>
      </Shell>
    );
  }

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
