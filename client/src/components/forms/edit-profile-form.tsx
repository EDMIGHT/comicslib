import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ProfileAvatar } from '@/components/profile-avatar';
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
import { Input } from '@/components/ui/input';
import { editProfileSchema, IEditProfileSchema } from '@/lib/validators/user.validators';
import { IUser } from '@/types/user.types';

type EditProfileFormProps = {
  user: IUser;
  currentUser: IUser;
};

export const EditProfileForm: FC<EditProfileFormProps> = ({ user, currentUser }) => {
  const form = useForm<IEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      img: user.img,
      login: user.login,
    },
  });

  const onSubmit = (data: IEditProfileSchema) => {
    console.log(data);
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
                <ProfileAvatar
                  {...user}
                  currentUser={currentUser}
                  className='md:h-[150px] md:w-[150px]'
                />
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
          <Button className='ml-auto'>Save</Button>
        </div>
      </form>
    </Form>
  );
};
