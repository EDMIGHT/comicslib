import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Shell } from '@/components/ui/shell';
import { cn } from '@/lib/utils';

export default function PageNotFound() {
  return (
    <Shell variant='centered' className='max-w-md'>
      <Icons.crackedHeart className='h-20 w-20 stroke-active' />
      <h1 className='text-3xl font-bold'>Page not found</h1>
      <p className='text-center text-muted-foreground'>
        The page we tried to go to does not exist or has been deleted
      </p>
      <Link href='/' replace className={cn(buttonVariants(), 'font-semibold')}>
        Go to Home
      </Link>
    </Shell>
  );
}
