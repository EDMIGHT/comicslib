'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { HREFS } from '@/configs/href.configs';
import { toast } from '@/hooks/use-toast';
import { ComicsService } from '@/services/comics.service';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectToRandomComic = async () => {
      try {
        const { randomId } = await ComicsService.getRandomId();
        router.replace(`${HREFS.comics}/${randomId}`);
      } catch (error) {
        router.replace('/');
        toast({
          title: 'Failed to receive random comic',
          description:
            'Perhaps the collection of comics on the site is empty, if this is not the case, then try again a little later',
          variant: 'destructive',
        });
      }
    };

    void redirectToRandomComic();
  }, [router]);

  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <div className='flex gap-2 md:gap-4'>
        <Skeleton className='h-[180px] w-[140px] shrink-0 rounded sm:h-[220px] sm:w-[180px] md:h-[250px] md:w-[210px]' />
        <div className='flex w-full flex-col gap-2'>
          <Skeleton className='h-[3rem] w-[80%]' />

          <div className='mt-auto hidden space-y-2 xl:block'>
            <Skeleton className='h-[30px] w-[200px]' />

            <div className='flex gap-2'>
              <Skeleton className='h-[50px] w-[150px]' />
              <Skeleton className='h-[50px] w-[150px]' />
              <Skeleton className='h-[50px] w-[150px]' />
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-2'>
        <Skeleton className='h-[40px] w-full lg:w-[150px]' />
        <Skeleton className='h-[40px] w-[150px]' />
        <Skeleton className='h-[40px] w-12 lg:w-[150px]' />
      </div>

      <div>
        <Skeleton className='h-[100px] w-full' />
      </div>
      <div className='flex gap-2'>
        <div className='flex flex-1 flex-col gap-2'>
          <Skeleton className='h-10 w-[150px]' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='hidden w-[250px] flex-col gap-2 xl:flex'>
          <Skeleton className='h-10 w-[200px]' />
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
