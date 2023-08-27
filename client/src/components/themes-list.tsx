import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { Badge } from '@/components/ui/badge';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
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
        <ul {...rest} className='flex gap-1'>
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
                {theme.title}
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
