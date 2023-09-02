'use client';

import { useMutation } from '@tanstack/react-query';
import { FC, HTMLAttributes, useState } from 'react';

import { UserService } from '@/services/users.service';

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
  const {} = useMutation({
    mutationKey: ['users'],
    mutationFn: async (fileBase64: string) => {
      return await UserService.update({
        img: fileBase64,
      });
    },
  });

  return (
    <FileDialogWithCrop onSelectFile={onSelectFile}>
      <Icons.camera className='absolute bottom-0 left-0 h-7 w-7 cursor-pointer transition-colors hover:stroke-active' />
    </FileDialogWithCrop>
  );
};
