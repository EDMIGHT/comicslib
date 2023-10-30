'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, useEffect, useRef } from 'react';

import { UserItem } from '@/components/layouts/user-item';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { UserItemSkeletons } from '@/components/skeletons/user-item-skeletons';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useAuth } from '@/hooks/use-auth';
import { useIntersection } from '@/hooks/use-intersection';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { IGetAllUsersArg, UsersService } from '@/services/users.service';
import { isInvalidResponseWithDetails } from '@/types/response.types';

export const UsersFeed: FC<IGetAllUsersArg> = ({ ...searchQuery }) => {
  const { countUsersPerPage } = useAppSelector((state) => state.settings);
  const { user } = useAuth();
  const lastUserRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastUserRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, refetch, isLoading, isSuccess, isError } =
    useInfiniteQuery({
      queryKey: [
        REACT_QUERY_KEYS.users,
        countUsersPerPage,
        searchQuery.login,
        searchQuery.sort,
        searchQuery.order,
      ],
      queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
        return await UsersService.getAllUsers({
          page: pageParam,
          limit: countUsersPerPage,
          ...searchQuery,
        });
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
      onError: (err) => {
        const withDetails =
          err instanceof AxiosError &&
          isInvalidResponseWithDetails(err.response?.data) &&
          err.response?.data;

        ErrorHandler.query(err, {
          validError: {
            title: 'Validation error',
            description:
              (withDetails && withDetails.details[0].msg) ||
              'There was a validation error caused by the server',
          },
        });
      },
    });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      void fetchNextPage();
    }
  }, [entry, fetchNextPage, hasNextPage]);

  const users = data?.pages.flatMap((page) => page.users);

  return (
    <ul
      ref={parent}
      className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    >
      {isSuccess &&
        (users && users.length > 0 ? (
          users.map((u, i) => {
            if (i === users.length - 1) {
              return (
                <li key={u.id} ref={ref}>
                  <UserItem {...u} currentUser={user} />
                </li>
              );
            } else {
              return (
                <li key={u.id}>
                  <UserItem {...u} currentUser={user} />
                </li>
              );
            }
          })
        ) : (
          <div className='col-span-1 flex h-[50vh] items-center justify-center text-center md:col-span-2 lg:col-span-3 xl:col-span-4'>
            <h3 className='text-2xl font-medium xl:text-3xl'>No users found 😢</h3>
          </div>
        ))}
      {isLoading && <UserItemSkeletons />}
      {isError && (
        <div className='col-span-1 flex h-[50vh] flex-col items-center justify-center gap-4 text-center md:col-span-2 lg:col-span-3 xl:col-span-4'>
          <Icons.fatalError className='h-20 w-20 stroke-active' />
          <h3 className='text-xl font-medium md:text-3xl'>Error requesting users</h3>
          <p className='text-center text-muted-foreground'>
            Apparently something went wrong, please reload the page or click the button below
          </p>
          <Button onClick={() => void refetch()}>Try again</Button>
        </div>
      )}
    </ul>
  );
};
