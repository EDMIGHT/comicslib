'use client';

import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Shell } from '@/components/ui/shell';

type GlobalErrorProps = {
  error: Error;
  reset: () => void;
};

// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-errors-in-root-layouts
// FIX абсолютно не работает

const GlobalError: FC<GlobalErrorProps> = ({ reset }) => {
  return (
    <html>
      <body>
        <Shell variant='centered' className='max-w-md'>
          <Icons.fatalError className='h-20 w-20 stroke-active' />
          <h1 className='text-3xl font-bold'>Fatal Error</h1>
          <p className='text-center text-muted-foreground'>
            The app seems to be broken, please refresh the page or use the button below
          </p>
          <Button onClick={() => reset()}>Try again</Button>
        </Shell>
      </body>
    </html>
  );
};

export default GlobalError;
