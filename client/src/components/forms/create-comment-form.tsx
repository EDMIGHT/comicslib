'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { createCommentValidation } from '@/lib/validators/comment.validators';
import { CommentsService } from '@/services/comments.service';

type CreateCommentFormProps = {
  comicId: string;
};

export type ICreateCommentFields = z.infer<typeof createCommentValidation>;

export const CreateCommentForm: FC<CreateCommentFormProps> = ({ comicId }) => {
  const router = useRouter();
  const form = useForm<ICreateCommentFields>({
    resolver: zodResolver(createCommentValidation),
    defaultValues: {
      text: '',
    },
  });

  const { mutate: createComment, isLoading } = useMutation({
    mutationKey: ['comments'],
    mutationFn: async (data: ICreateCommentFields) => {
      return await CommentsService.create(data, comicId);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            variant: 'destructive',
            title: 'Invalid request body',
            description:
              err.response.data?.details[0]?.msg ||
              'Check the correctness of the entered text',
          });
        } else if (err.response?.status === 401) {
          return toast({
            variant: 'destructive',
            title: 'Authorization Error',
            description: 'Please login or refresh the page',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Sorry, something went wrong while creating the comment',
            description: 'Please double check your input or try again later',
          });
        }
      }
    },
    onSuccess: () => {
      form.reset();
      router.refresh();
      // queryClient.invalidateQueries(['comments']);
    },
  });

  const onSubmit = (data: ICreateCommentFields) => {
    createComment(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-1 '>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem className='relative space-y-1'>
              <FormLabel className='pl-2 text-base font-semibold' htmlFor='text'>
                Text comment
              </FormLabel>
              <FormControl>
                <Textarea id='text' placeholder='type your comment here..' {...field} />
              </FormControl>
              <FormMessage className='absolute bottom-[-1.5rem] left-[0.5rem]' />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-fit self-end' isLoading={isLoading}>
          Create
        </Button>
      </form>
    </Form>
  );
};
