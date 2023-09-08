'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { IGenre } from '@/types/genre.types';
import { ITheme } from '@/types/theme.types';

type ComicAttributesProps = {
  genres: IGenre[];
  themes: ITheme[];
  limit?: number;
  isLink?: boolean;
  variant?: ButtonProps['variant'];
};

export const ComicAttributes: FC<ComicAttributesProps> = ({
  genres,
  themes,
  limit = 5,
  isLink = true,
  variant,
}) => {
  const [showAll, setShowAll] = useState(false);

  const mixedAttributes = [];

  const maxLength = Math.max(genres.length, themes.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < genres.length) {
      mixedAttributes.push({
        ...genres[i],
        href: `${HREFS.comicAttributes.genre}/${genres[i].title.toLowerCase()}`,
      });
    }
    if (i < themes.length) {
      mixedAttributes.push({
        ...themes[i],
        href: `${HREFS.comicAttributes.theme}/${themes[i].title.toLowerCase()}`,
      });
    }
  }

  return (
    <>
      <ul className='flex flex-wrap gap-1'>
        {(showAll ? mixedAttributes : mixedAttributes.slice(0, limit)).map((attr) => (
          <li key={attr.title + attr.id}>
            {isLink ? (
              <Link
                className={cn(
                  buttonVariants({ variant: variant ?? 'ghost' }),
                  'h-fit px-1 py-0 text-xs font-semibold uppercase'
                )}
                href={attr.href}
              >
                {attr.title}
              </Link>
            ) : (
              <Badge
                className={cn(
                  buttonVariants({ variant: variant ?? 'default' }),
                  'px-1 py-0 h-fit text-xs font-semibold uppercase'
                )}
              >
                {attr.title}
              </Badge>
            )}
          </li>
        ))}
        {!showAll && mixedAttributes.length > limit && (
          <li>
            <button
              onClick={() => setShowAll(true)}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'py-1 h-fit px-1 text-xs font-bold uppercase text-active'
              )}
            >
              MORE
            </button>
          </li>
        )}
      </ul>
    </>
  );
};
