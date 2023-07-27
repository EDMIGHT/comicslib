import { NextPage } from 'next';

export type IRoles = {
  isOnlyUser?: boolean;
};

export type NextPageAuth<P = {}> = NextPage<P> & IRoles;

export type IComponentAuthFields = {
  Component: IRoles;
};
