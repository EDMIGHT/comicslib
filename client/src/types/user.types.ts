export type IUser = {
  id: string;
  login: string;
  name: string | null;
  password: string;
  img: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IResponseUser = Omit<IUser, 'password'>;

export type IResponseAuth = {
  user: IResponseUser;
  accessToken: string;
  refreshToken: string;
};
