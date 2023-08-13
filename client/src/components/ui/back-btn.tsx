'use client';

import { useRouter } from 'next/navigation';

import { Icons } from './icons';

export const BackBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className='rounded-full p-1 hover:bg-secondary focus:bg-secondary'
    >
      <Icons.back />
    </button>
  );
};
