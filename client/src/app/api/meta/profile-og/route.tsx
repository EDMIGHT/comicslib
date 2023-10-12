/* eslint-disable @next/next/no-img-element */
import { ServerRuntime } from 'next';
import { ImageResponse } from 'next/server';

import { ENDPOINTS } from '@/configs/endpoint.configs';
import { SITE_CONFIG } from '@/configs/site.configs';
import { profileOgImageSchema } from '@/lib/validators/site.validators';
import { IProfile } from '@/types/user.types';

export const runtime: ServerRuntime = 'edge';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parsedValues = profileOgImageSchema.parse(Object.fromEntries(url.searchParams));

    const { login } = parsedValues;

    const fetchUrl = process.env.API_HOST + `${ENDPOINTS.users.profile}/${login}`;

    const existedUser = (await fetch(fetchUrl).then((res) => res.json())) as IProfile;

    const fontSemiBold = await fetch(
      new URL('../../../../assets/fonts/Poppins-SemiBold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    const fontMedium = await fetch(
      new URL('../../../../assets/fonts/Poppins-Medium.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          tw='h-full w-full flex flex-col justify-between py-6 px-8'
          style={{
            color: '#fff',
            background: 'black',
            fontFamily: '"Poppins"',
          }}
        >
          <div tw='flex justify-center items-center my-auto'>
            <img
              src={existedUser.img}
              alt='background'
              tw='w-[200px] h-[200px] object-cover object-center rounded-full mr-4'
            />
            <h1
              tw='text-5xl font-semibold m-0'
              style={{
                wordBreak: 'break-word',
              }}
            >
              {existedUser.login}
            </h1>
          </div>

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
