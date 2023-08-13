'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { ComicsService } from '@/services/comics.service';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const getRandom = async () => {
      const { randomId } = await ComicsService.getRandomId();
      router.push(`/comics/${randomId}`);
    };

    getRandom();
  }, []);

  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <div className='flex gap-2 md:gap-4'>
        <Skeleton className='h-[200px] w-[200px] rounded' />
        <div className='flex w-full flex-col gap-2'>
          <div className='flex justify-between gap-2 pt-2'>
            <Skeleton className='h-[4.5rem] w-[200px]' />
            <Skeleton className='h-7 w-[100px]' />
          </div>
          <div className='mt-auto'>
            <div className='flex gap-2'>
              <Skeleton className='h-[50px] w-[150px]' />
              <Skeleton className='h-[50px] w-[150px]' />
              <Skeleton className='h-[50px] w-[150px]' />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Skeleton className='h-[100px] w-full' />
      </div>
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'></div>
        <div className='flex min-w-[25%] max-w-[300px] flex-col gap-2'>
          <div className='flex items-center gap-1'>
            <h2 className='text-xl font-semibold'>Status:</h2>
            <Skeleton className='h-5 w-[120px]' />
          </div>
          <div>
            <h2 className='text-xl font-semibold'>Authors:</h2>
            <ul className='flex flex-wrap gap-1'>
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[120px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[100px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[80px]' />
            </ul>
          </div>
          <div>
            <h2 className='text-xl font-semibold'>Genres:</h2>
            <ul className='flex flex-wrap gap-1'>
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[120px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[100px]' />
              <Skeleton className='h-5 w-[80px]' />
              <Skeleton className='h-5 w-[80px]' />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
