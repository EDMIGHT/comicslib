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
  page?: number;
  limit?: number;
};

export type ISortArg = {
  sort?: string;
  order?: string;
};

export type IBadResponse = {
  error: {
    data: {
      message: string;
    };
  };
};

export const isBadResponse = (response: any): response is IBadResponse => {
  return (
    response?.error !== undefined &&
    response.error.data !== undefined &&
    response.error.data.message !== undefined
  );
};
