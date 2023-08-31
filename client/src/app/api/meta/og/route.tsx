import { ServerRuntime } from 'next';
import { ImageResponse } from 'next/server';

import { SITE_CONFIG } from '@/configs/site.configs';
import { ogImageSchema } from '@/lib/validators/meta.validators';

export const runtime: ServerRuntime = 'edge';

export function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parsedValues = ogImageSchema.parse(Object.fromEntries(url.searchParams));

    const { mode, title, description, type } = parsedValues;

    return new ImageResponse(
      (
        <div
          tw='h-full w-full flex items-center justify-center flex-col'
          style={{
            color: mode === 'dark' ? '#fff' : '#000',
            background: mode === 'dark' ? 'black' : 'white',
          }}
        >
          <div tw='flex flex-row items-center gap-2 justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='50'
              height='50'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <circle cx='12' cy='12' r='3' />
              <circle cx='19' cy='5' r='2' />
              <circle cx='5' cy='19' r='2' />
              <path d='M10.4 21.9a10 10 0 0 0 9.941-15.416' />
              <path d='M13.5 2.1a10 10 0 0 0-9.841 15.416' />
            </svg>
            <h2 tw='text-4xl font-bold pl-2'>{SITE_CONFIG.name}</h2>
          </div>
          <div
            tw='flex max-w-4xl items-center justify-center flex-col mt-10'
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {type ? (
              <div tw='text-xl uppercase font-medium tracking-tight leading-tight dark:text-zinc-50 px-8'>
                {type}
              </div>
            ) : null}
            <h1 tw='text-5xl font-bold tracking-tight leading-tight dark:text-zinc-50 px-8'>
              {title}
            </h1>
            {description ? (
              <div tw='mt-5 text-3xl text-zinc-400 text-center font-normal tracking-tight leading-tight px-20'>
                {description}
              </div>
            ) : null}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    error instanceof Error
      ? console.error('OG Error', error.message)
      : console.error('OG Error', error);

    return new Response('OG Image generation error', {
      status: 500,
    });
  }
}
