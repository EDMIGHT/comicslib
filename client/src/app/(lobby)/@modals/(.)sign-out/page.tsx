'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { OverlayModal } from '@/components/overlay-modal';
import { SignOutMenu } from '@/components/sign-out-menu';
import { useClickOutside } from '@/hooks/use-click-outside';

const Page: FC = () => {
  const router = useRouter();

  const handlerRefPopup = useClickOutside(() => router.back());

  return (
    <OverlayModal>
      <div
        ref={handlerRefPopup}
        className='z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200  sm:rounded-lg md:w-full'
      >
        <h1 className='text-lg font-semibold leading-none tracking-tight'>Sign Out</h1>
        <h3>Are you sure you want to sign out?</h3>
        <SignOutMenu className='justify-self-end' />
      </div>
    </OverlayModal>
  );
};

export default Page;
