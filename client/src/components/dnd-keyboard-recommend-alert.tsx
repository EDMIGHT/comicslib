import { FC } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Icons } from '@/components/ui/icons';

export const DndKeyboardRecommendAlert: FC = () => {
  return (
    <Alert>
      <AlertTitle className='flex items-center gap-2'>
        <Icons.stopHand />
        Heads up!
      </AlertTitle>
      <AlertDescription>
        You can move loaded pages using the keyboard - to do this, highlight the desired page
        using{' '}
        <kbd className='pointer-events-none select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-sm font-medium'>
          <abbr title={'SPACE'}>TAB</abbr>
        </kbd>{' '}
        and press{' '}
        <kbd className='pointer-events-none select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-sm font-medium'>
          <abbr title={'SPACE'}>SPACE</abbr>
        </kbd>
        , after which you can use the arrows to move in the direction you need
      </AlertDescription>
    </Alert>
  );
};
