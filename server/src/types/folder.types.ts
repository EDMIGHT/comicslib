import { Folder } from '@prisma/client';

import { IShortUser } from './user.types';

export type IResponseFolderWithData = Folder & {
  user: IShortUser;
  _count: {
    comics: number;
  };
};

export type IFolderWithComicIds = Folder & {
  comics: { id: string }[];
};

export type IFoldersWithIsExistComic = IFolderWithComicIds & {
  isComicExist?: boolean;
};
