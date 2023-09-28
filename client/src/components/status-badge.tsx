import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { FC } from 'react';

import { HREFS } from '@/configs/href.configs';
import { cn } from '@/lib/utils';
import { IStatus } from '@/types/status.types';

const statusBadgeVariants = cva(
  'inline-flex cursor-pointer items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        transparent:
          'border-none text-foreground hover:bg-accent hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: IStatus['name'];
  type?: 'default' | 'link';
}

export const StatusBadge: FC<StatusBadgeProps> = ({
  status,
  className,
  variant,
  type = 'default',
  ...rest
}) => {
  return (
    <div {...rest} className={cn(statusBadgeVariants({ variant }), className)}>
      <div
        className={cn(
          'rounded-full w-2 h-2 ',
          status === 'ongoing' && 'bg-green-600',
          status === 'completed' && 'bg-blue-500',
          status === 'cancelled' && 'bg-red-800',
          status === 'hiatus' && 'bg-orange-500'
        )}
      />
      {type === 'default' ? (
        status
      ) : (
        <Link href={`${HREFS.comicAttributes.status}/${status}`}>{status}</Link>
      )}
    </div>
  );
};
