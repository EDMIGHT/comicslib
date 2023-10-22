import { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { HREFS } from '@/configs/href.configs';
import { PROTECTED_PAGE_META } from '@/configs/meta.configs';

export const metadata: Metadata = {
  title: PROTECTED_PAGE_META.title,
  description: PROTECTED_PAGE_META.desc,
};

const Page = () => {
  return (
    <div className='flex h-[75vh] flex-col items-center justify-center gap-4'>
      <Icons.protected className='h-20 w-20 fill-active stroke-active' />
      <h1 className='text-3xl font-bold'>Access failed</h1>
      <p className=' max-w-md text-center text-muted-foreground'>
        You tried to access a resource that requires authorization, please sign in in before
        attempting to access it again
      </p>
      <div className='flex gap-2'>
        <Link href={HREFS.auth.signIn} className={buttonVariants()}>
          Sign in
        </Link>
        <Link href={HREFS.auth.signUp} className={buttonVariants({ variant: 'ghost' })}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Page;
