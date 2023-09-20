import { FC } from 'react';

import { ESITE_THEMES } from '@/configs/site.configs';
import { cn } from '@/lib/utils';

type ThemeViewProps = {
  value: ESITE_THEMES | 'system';
  currentTheme?: string;
};

const colorsBase = {
  [ESITE_THEMES.LIGHT]: {
    bg: 'bg-[#ecedef]',
    card: 'bg-[#fff]',
    content: 'bg-[#ecedef]',
  },
  [ESITE_THEMES.DARK]: {
    bg: 'bg-[#09090b]',
    card: 'bg-[#1f1f1f]',
    content: 'bg-[#fff]',
  },
  [ESITE_THEMES.GRAY]: {
    bg: 'bg-slate-950',
    card: 'bg-slate-800',
    content: 'bg-slate-400',
  },
};

export const ThemeView: FC<ThemeViewProps> = ({ value, currentTheme }) => {
  if (value === 'system') {
    return (
      <div
        className={cn(
          'items-center rounded-md border-2 p-1 border-muted ',
          value === currentTheme ? 'border-active' : 'hover:border-primary '
        )}
      >
        <div className='relative h-[140px] w-[160px]'>
          <div
            className={`absolute inset-0 h-full w-full space-y-2 rounded-sm p-2 ${colorsBase.light.bg}`}
          >
            <div className={`space-y-2 rounded-md ${colorsBase.light.card} p-2 shadow-sm`}>
              <div className={`h-2 w-full rounded-lg ${colorsBase.light.content}`} />
              <div className={`h-2 w-full rounded-lg ${colorsBase.light.content}`} />
            </div>
            <div
              className={`flex items-center space-x-2 rounded-md ${colorsBase.light.card} p-2 shadow-sm`}
            >
              <div className={`h-4 w-4 rounded-full ${colorsBase.light.content}`} />
              <div className={`h-2 w-full rounded-lg ${colorsBase.light.content}`} />
            </div>
            <div
              className={`flex items-center space-x-2 rounded-md ${colorsBase.light.card} p-2 shadow-sm`}
            >
              <div className={`h-4 w-4 rounded-full ${colorsBase.light.content}`} />
              <div className={`h-2 w-full rounded-lg ${colorsBase.light.content}`} />
            </div>
          </div>
          <div
            className={`absolute inset-0 h-full w-full space-y-2 rounded-sm ${colorsBase.dark.bg} p-2 [clip-path:polygon(0_0,100%_0,100%_100%,0_0)]`}
          >
            <div className={`space-y-2 rounded-md ${colorsBase.dark.card} p-2 shadow-sm`}>
              <div className={`h-2 w-full rounded-lg ${colorsBase.dark.content}`} />
              <div className={`h-2 w-full rounded-lg ${colorsBase.dark.content}`} />
            </div>
            <div
              className={`flex items-center space-x-2 rounded-md ${colorsBase.dark.card} p-2 shadow-sm`}
            >
              <div className={`h-4 w-5 rounded-full ${colorsBase.dark.content}`} />
              <div className={`h-2 w-full rounded-lg ${colorsBase.dark.content}`} />
            </div>
            <div
              className={`flex items-center space-x-2 rounded-md ${colorsBase.dark.card} p-2 shadow-sm`}
            >
              <div className={`h-4 w-5 rounded-full ${colorsBase.dark.content}`} />
              <div className={`h-2 w-full rounded-lg ${colorsBase.dark.content}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const colors = colorsBase[value];

  return (
    <div
      className={cn(
        'items-center rounded-md border-2 p-1 border-muted ',
        value === currentTheme ? 'border-active' : 'hover:border-primary '
      )}
    >
      <div className='h-[140px] w-[160px]'>
        <div className={`left-0 top-0 h-full w-full space-y-2 rounded-sm ${colors.bg} p-2`}>
          <div className={`space-y-2 rounded-md ${colors.card} p-2 shadow-sm`}>
            <div className={`h-2 w-full rounded-lg ${colors.content}`} />
            <div className={`h-2 w-full rounded-lg ${colors.content}`} />
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md ${colors.card} p-2 shadow-sm`}
          >
            <div className={`h-4 w-5 rounded-full ${colors.content}`} />
            <div className={`h-2 w-full rounded-lg ${colors.content}`} />
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md ${colors.card} p-2 shadow-sm`}
          >
            <div className={`h-4 w-5 rounded-full ${colors.content}`} />
            <div className={`h-2 w-full rounded-lg ${colors.content}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
