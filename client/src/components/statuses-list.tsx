import { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { IStatus } from '@/types/status.types';

type StatusesListProps = {
  statuses: IStatus[];
  activeStatuses?: string[];
  onClick?: (genre: IStatus) => any;
};

export const StatusesList: FC<StatusesListProps> = ({ statuses, onClick, activeStatuses }) => {
  return (
    <>
      {statuses.length > 0 ? (
        <ul className='flex gap-1'>
          {statuses.map((status) => (
            <li key={status.id}>
              <Badge
                onClick={() => onClick && onClick(status)}
                variant={
                  activeStatuses?.some((activeStat) => activeStat === status.name)
                    ? 'active'
                    : 'default'
                }
              >
                {status.name.toLowerCase()}
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
