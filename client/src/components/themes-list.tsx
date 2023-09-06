'use client';

import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

import { Badge } from '@/components/ui/badge';
import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { ITheme } from '@/types/theme.types';

type ThemesListProps = HTMLAttributes<HTMLUListElement> & {
  themes: ITheme[];
  activeThemes?: string[];
  onClickItem?: (theme: ITheme) => void;
  type?: 'default' | 'link';
};

export const ThemesList: FC<ThemesListProps> = ({
  themes,
  onClickItem,
  activeThemes,
  className,
  type = 'default',
  ...rest
}) => {
  return (
    <>
      {themes.length > 0 ? (
        <ul {...rest} className={cn('flex flex-wrap gap-1', className)}>
          {themes.map((theme) => (
            <li key={theme.id}>
              <Badge
                onClick={() => onClickItem && onClickItem(theme)}
                className='capitalize'
                variant={
                  activeThemes?.some((activeTheme) => activeTheme === theme.title)
                    ? 'active'
                    : 'default'
                }
              >
                {type === 'link' && (
                  <Link href={`${HREFS.comicAttributes.theme}/${theme.title}`}>
                    <h4>{theme.title}</h4>
                  </Link>
                )}
                {type === 'default' && <h4>{theme.title}</h4>}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h4 className='text-base'>No themes</h4>
        </div>
      )}
    </>
  );
};
