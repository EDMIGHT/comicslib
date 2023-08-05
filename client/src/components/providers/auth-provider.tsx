'use client';

import { useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { useActions } from '@/hooks/use-actions';
import { getRefreshToken, saveTokens } from '@/lib/helpers/token.helper';
import { AuthService } from '@/services/auth.service';

type LayoutProps = {
  children: ReactNode;
};

// TODO как можно более адекватно рефрешить токены

export const AuthProvider: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { setUser } = useActions();
  const expiresInRef = useRef(0);
  const isValidRef = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const tokens = await AuthService.getNewTokens();
          saveTokens(tokens);

          if (tokens.accessToken) {
            const user = await AuthService.getUser();
            setUser(user);
          }

          expiresInRef.current = tokens.expiresIn;
        }
      } catch (error) {
        isValidRef.current = false;

        saveTokens({
          accessToken: '',
          refreshToken: '',
          expiresIn: 0,
        });
        setUser(null);
      } finally {
        router.refresh();
      }
    };

    initialize();

    const immediateIntervalId = setTimeout(() => {
      if (isValidRef.current) {
        intervalRef.current = setInterval(() => {
          if (!isValidRef.current) {
            clearInterval(intervalRef.current!);
          }
        }, expiresInRef.current * 1000);
      }
    }, 0);

    return () => {
      clearTimeout(immediateIntervalId);
      clearInterval(intervalRef.current!);
    };
  }, []);

  return <div>{children}</div>;
};
