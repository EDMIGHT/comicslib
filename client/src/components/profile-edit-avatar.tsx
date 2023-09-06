'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes, ReactNode } from 'react';

import { Icons } from '@/components/ui/icons';
import { convertImgToBase64 } from '@/lib/helpers/convertImgToBase64';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { cn } from '@/lib/utils';
import { UserService } from '@/services/users.service';

import { FileDialogWithCrop } from './file-dialog-with-crop';

type ProfileEditAvatarProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const ProfileEditAvatar: FC<ProfileEditAvatarProps> = ({
  className,
  children,
  ...props
}) => {
  const router = useRouter();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationKey: ['users'],
    mutationFn: async (fileBase64: string) => {
      return await UserService.update({
        img: fileBase64,
      });
    },
    onSuccess: () => {
      router.refresh();
    },
    onError: (err) => {
      handleErrorMutation(err);
    },
  });

  const onSelectFile = async (file: File) => {
    const convertedFile = await convertImgToBase64(file);

    if (convertedFile) {
      updateUser(convertedFile);
    }
  };

  return (
    <FileDialogWithCrop {...props} onSelectFile={onSelectFile}>
      <div className={cn('h-full w-full cursor-pointer', className)}>
        {isLoading ? (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Icons.loading className='h-10 w-10 animate-spin' />
          </div>
        ) : (
          children
        )}
      </div>
    </FileDialogWithCrop>
  );
};
