'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect, useRef } from 'react';

import { UserItem } from '@/components/layouts/user-item';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { UserItemSkeletons } from '@/components/skeletons/user-item-skeletons';
import { useAppSelector } from '@/hooks/redux-hooks';
import { useAuth } from '@/hooks/use-auth';
import { useIntersection } from '@/hooks/use-intersection';
import { IGetAllUsersArg, UsersService } from '@/services/users.service';

export const UsersFeed: FC<IGetAllUsersArg> = ({ ...searchQuery }) => {
  const { countUsersPerPage } = useAppSelector((state) => state.settings);
  const { user } = useAuth();
  const lastUserRef = useRef<HTMLLIElement>(null);
  const [parent] = useAutoAnimate();

  const { ref, entry } = useIntersection({
    root: lastUserRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isSuccess, isError } = useInfiniteQuery(
    [
      REACT_QUERY_KEYS.users,
      countUsersPerPage,
      searchQuery.login,
      searchQuery.sort,
      searchQuery.order,
    ],
    async ({ pageParam = 1 }: { pageParam?: number }) => {
      return await UsersService.getAllUsers({
        page: pageParam,
        limit: countUsersPerPage,
        ...searchQuery,
      });
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );

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
      {(isLoading || isError) && <UserItemSkeletons />}
    </ul>
  );
};
