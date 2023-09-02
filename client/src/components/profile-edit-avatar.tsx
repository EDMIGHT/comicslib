'use client';

import { FC, HTMLAttributes, useState } from 'react';

import { FileDialog } from './file-dialog';
import { FileDialogWithCrop } from './file-dialog-with-crop';
import { Icons } from './ui/icons';

type ProfileEditAvatarProps = HTMLAttributes<HTMLDivElement> & {
  onSelectFile: (file: File) => void;
};

export const ProfileEditAvatar: FC<ProfileEditAvatarProps> = ({
  className,
  onSelectFile,
  ...props
}) => {
  return (
    <FileDialogWithCrop onSelectFile={onSelectFile}>
      <Icons.camera className='absolute bottom-0 left-0 h-7 w-7 cursor-pointer transition-colors hover:stroke-active' />
    </FileDialogWithCrop>
  );
};
