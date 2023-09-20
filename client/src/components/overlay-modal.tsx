'use client';

import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes, MouseEvent, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type OverlayModalProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  onClick?: () => void;
};

export const OverlayModal: FC<OverlayModalProps> = ({
  children,
  onClick,
  className,
  ...rest
}) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick();
    event.stopPropagation();
  };

  return (
    <div
      {...rest}
      onClick={handleClick}
      className={cn(
        'fixed inset-0 h-screen w-screen z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  );
};
