export type IPagination = {
  currentPage: number;
  totalPages: number;
};

export type ITokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type IPaginationArg = {
  page?: number | string;
  limit?: number | string;
};

export type ISortArg = {
  sort?: string;
  order?: string;
};

export type IBadResponse = {
  message: string;
};

export type IInvalidResponse = IBadResponse & {
  details: [
    {
      type: string;
      value: string | number;
      msg: string;
      path: string;
      location: string;
    },
  ];
  body: unknown;
};

export const isWithTokensResponse = (obj: unknown): obj is ITokens =>
  obj !== null &&
  typeof obj === 'object' &&
  'refreshToken' in obj &&
  'accessToken' in obj &&
  'expiresIn' in obj;
