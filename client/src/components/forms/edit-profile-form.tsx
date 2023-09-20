'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FileDialogWithCrop } from '@/components/file-dialog-with-crop';
import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/user-avatar';
import { HREFS } from '@/configs/href.configs';
import { useActions } from '@/hooks/use-actions';
import { convertImgToBase64 } from '@/lib/helpers/convertImgToBase64';
import { handleErrorMutation } from '@/lib/helpers/handleErrorMutation';
import { cn } from '@/lib/utils';
import { editProfileSchema, IEditProfileSchema } from '@/lib/validators/user.validators';
import { UsersService } from '@/services/users.service';
import { IUser } from '@/types/user.types';

type EditProfileFormProps = {
  user: IUser;

  isDialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditProfileForm: FC<EditProfileFormProps> = ({
  user,
  isDialogOpen,
  setDialogOpen,
}) => {
  const router = useRouter();
  const { setUser } = useActions();
  const form = useForm<IEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      login: user.login,
    },
  });

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset();
    }
  }, [isDialogOpen, form]);

  const { mutate: editProfile, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.me, REACT_QUERY_KEYS.users],
    mutationFn: async ({ img, login }: IEditProfileSchema) => {
      const payload: IEditProfileSchema = {
        img,
        login: login === user.login ? undefined : login,
      };

      return await UsersService.update(payload);
    },
    onSuccess: (res) => {
      setUser(res);
      router.replace(`${HREFS.profile}/${res.login}`);
      router.refresh();
      setDialogOpen(false);
    },
    onError: (err) => {
      handleErrorMutation(err, {
        conflictError: {
          title: 'Conflict',
          description:
            'A user with this login already exists, please select a different login',
        },
      });
    },
  });

  const handleSelectFile = async (
    onChangeHandler: (...event: unknown[]) => void,
    file: File
  ) => {
    const imageBASE64 = await convertImgToBase64(file);

    if (imageBASE64) {
      onChangeHandler(imageBASE64);
    }
  };

  const onSubmit = (data: IEditProfileSchema) => {
    editProfile(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='flex items-center gap-2'
      >
        <FormField
          control={form.control}
          name='img'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    'relative h-[120px] w-[120px] md:h-[150px] md:w-[150px] group'
                  )}
                >
                  <FileDialogWithCrop
                    onSelectFile={(file) => handleSelectFile(field.onChange, file)}
                  >
                    <div className='h-full w-full cursor-pointer'>
                      <UserAvatar
                        img={field.value ?? user.img}
                        login={user.login}
                        className='h-full w-full transition-colors group-hover:brightness-50'
                      />
                      <Icons.camera className='absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100' />
                    </div>
                  </FileDialogWithCrop>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-2'>
          <FormField
            control={form.control}
            name='login'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder='enter new login..' {...field} />
                </FormControl>
                <FormDescription>Your unique and public name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='ml-auto' isLoading={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
