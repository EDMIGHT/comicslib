'use client';

import { FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

type ShowMoreHocProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  classNameContent?: string;
  classNameGradient?: string;
};

export const ShowMoreHoc: FC<ShowMoreHocProps> = ({
  children,
  classNameContent,
  classNameGradient,
  className,
  ...rest
}) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isShowMore) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = `${70}px`;
    }
  }, [isShowMore]);

  return (
    <div {...rest} className={className}>
      <div
        ref={contentRef}
        className={cn('relative overflow-hidden transition-all', classNameContent)}
        style={{
          maxHeight: 70,
        }}
      >
        {children}
        <div
          className={cn(
            'absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-background to-transparent transition-all',
            isShowMore && 'h-0',
            classNameGradient
          )}
        />
      </div>
      <div
        className={cn(
          'flex h-4  w-full justify-center border-t-[1px] border-t-active',
          isShowMore && 'border-none'
        )}
      >
        <Button
          onClick={() => setIsShowMore((prev) => !prev)}
          variant={isShowMore ? 'secondary' : 'active'}
          className={cn('h-fit px-1 py-0 text-sm', !isShowMore && 'rounded-none rounded-b-md')}
        >
          <Icons.chevronDown
            className={cn('h-5 w-5 transition-transform', isShowMore && 'rotate-180')}
          />
          {isShowMore ? 'see less' : 'see more'}
          <Icons.chevronDown
            className={cn('h-5 w-5 transition-transform', isShowMore && 'rotate-180')}
          />
        </Button>
      </div>
    </div>
  );
};
