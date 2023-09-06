import { FC, HTMLAttributes } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IStatus } from '@/types/status.types';

type StatusesListProps = HTMLAttributes<HTMLUListElement> & {
  statuses: IStatus[];
  activeStatuses?: string[];
  onClickItem?: (statusName: string) => void;
};

export const StatusesList: FC<StatusesListProps> = ({
  statuses,
  onClickItem,
  activeStatuses,
  className,
  ...rest
}) => {
  return (
    <>
      {statuses.length > 0 ? (
        <ul {...rest} className={cn('flex gap-1 flex-wrap', className)}>
          {statuses.map((status) => (
            <li key={status.id}>
              <Badge
                onClick={() => onClickItem && onClickItem(status.name)}
                className='capitalize'
                variant={
                  activeStatuses?.some((activeStat) => activeStat === status.name)
                    ? 'active'
                    : 'default'
                }
              >
                {status.name}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h4 className='text-base'>empty</h4>
        </div>
      )}
    </>
  );
};
