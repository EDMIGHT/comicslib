'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    toast({
      title: 'Something went wrong',
      description: 'Please try again later or refresh the page',
      variant: 'destructive',
    });
  }, []);

  return (
    <div className='flex h-[30vh] w-full flex-col items-center justify-center gap-2'>
      <h3 className='text-xl font-medium'>There was an error loading chapters</h3>
      <Button onClick={() => reset()} className=''>
        Try again
      </Button>
    </div>
  );
}
