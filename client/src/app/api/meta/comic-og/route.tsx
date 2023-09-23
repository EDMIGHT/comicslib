/* eslint-disable @next/next/no-img-element */
import { ServerRuntime } from 'next';
import { ImageResponse } from 'next/server';

import { ENDPOINTS } from '@/configs/endpoint.configs';
import { SITE_CONFIG } from '@/configs/site.configs';
import { comicOgImageSchema } from '@/lib/validators/site.validators';
import { IResponseComic } from '@/types/comic.types';

export const runtime: ServerRuntime = 'edge';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parsedValues = comicOgImageSchema.parse(Object.fromEntries(url.searchParams));

    const { comicId } = parsedValues;

    const fetchUrl = process.env.API_HOST + `${ENDPOINTS.comics.origin}/${comicId}`;

    const existedComic = (await fetch(fetchUrl).then((res) => res.json())) as IResponseComic;

    const fontSemiBold = await fetch(
      new URL('../../../../assets/fonts/Poppins-SemiBold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    const fontMedium = await fetch(
      new URL('../../../../assets/fonts/Poppins-Medium.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          tw='relative h-full w-full flex justify-between '
          style={{
            color: '#fff',
            background: 'black',
            fontFamily: '"Poppins"',
          }}
        >
          <img
            src={existedComic.img}
            alt={existedComic.title}
            tw='-z-10 object-cover absolute'
            style={{
              filter: `blur(8px) brightness(.4)`,
            }}
          />
          <div tw='flex flex-col w-2/3 py-6 px-8 flex-wrap'>
            <h1
              tw='text-5xl flex font-semibold m-0'
              style={{
                wordBreak: 'break-all',
              }}
            >
              {existedComic.title}
            </h1>
            <h2
              tw='text-xl font-medium m-0'
              style={{
                wordBreak: 'break-all',
              }}
            >
              {existedComic.authors.map((author) => author.login).join(', ')}
            </h2>
            <div tw='flex flex-row items-center mt-auto'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
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
              <h2 tw='font-bold pl-2 text-2xl'>{SITE_CONFIG.name}</h2>
            </div>
          </div>
          <img
            src={existedComic.img}
            alt='background'
            tw='w-1/3 object-cover object-center h-full'
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Poppins',
            data: fontMedium,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Poppins',
            data: fontSemiBold,
            style: 'normal',
            weight: 700,
          },
        ],
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
