'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { CreateAuthorForm } from '@/components/forms/create-author-form';
import { OverlayModal } from '@/components/overlay-modal';
import { useClickOutside } from '@/hooks/use-click-outside';

type PageProps = {
  searchParams: {
    login: string;
  };
};

const Page: FC<PageProps> = ({ searchParams: { login } }) => {
  const router = useRouter();

  const handlerRefPopup = useClickOutside(() => router.back());

  return (
    <OverlayModal>
      <div
        ref={handlerRefPopup}
        className='z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200  sm:rounded-lg md:w-full'
      >
        <h1 className='text-lg font-semibold leading-none tracking-tight'>Create Author</h1>
        <CreateAuthorForm initialLogin={login} handleSuccess={() => router.back()} />
      </div>
    </OverlayModal>
  );
};

export default Page;
