import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC, HTMLAttributes } from 'react';

import { Badge } from '@/components/ui/badge';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { ITheme } from '@/types/theme.types';

type ThemesListProps = HTMLAttributes<HTMLUListElement> & {
  themes: ITheme[];
  activeThemes?: string[];
  onClickItem?: (genreTitle: string) => void;
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
          {themes.map(({ id, title }) => (
            <li key={id}>
              <Badge
                onClick={() => onClickItem && onClickItem(title)}
                className='capitalize'
                variant={
                  activeThemes?.some((activeTheme) => activeTheme === title)
                    ? 'active'
                    : 'default'
                }
              >
                {title}
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
