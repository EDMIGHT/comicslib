'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes, ReactNode } from 'react';

import { FileDialogWithCrop } from '@/components/file-dialog-with-crop';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Icons } from '@/components/ui/icons';
import { useActions } from '@/hooks/use-actions';
import { convertImgToBase64 } from '@/lib/helpers/convertImgToBase64';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { cn } from '@/lib/utils';
import { UsersService } from '@/services/users.service';

type ProfileEditAvatarProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const ProfileEditAvatar: FC<ProfileEditAvatarProps> = ({
  className,
  children,
  ...props
}) => {
  const { setUser } = useActions();
  const router = useRouter();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.me, REACT_QUERY_KEYS.users],
    mutationFn: async (fileBase64: string) => {
      return await UsersService.update({
        img: fileBase64,
      });
    },
    onSuccess: (res) => {
      setUser(res);
      router.refresh();
    },
    onError: (err) => {
      handleErrorMutation(err);
    },
  });

  const onSelectFile = async (file: File) => {
    const convertedFile = await convertImgToBase64(file);

    if (convertedFile) {
      void updateUser(convertedFile);
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
