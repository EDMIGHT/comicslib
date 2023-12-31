'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { REACT_QUERY_KEYS } from '@/components/providers/query-provider';
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
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { createCommentValidation } from '@/lib/validators/comment.validators';
import { CommentsService } from '@/services/comments.service';
import { isInvalidResponseWithDetails } from '@/types/response.types';

type CreateCommentFormProps = {
  comicId: string;
  parentCommentId?: string;
  onConfirm?: () => void;
};

export type ICreateCommentFields = z.infer<typeof createCommentValidation>;

export const CreateCommentForm: FC<CreateCommentFormProps> = ({
  comicId,
  parentCommentId,
  onConfirm,
}) => {
  const router = useRouter();
  const form = useForm<ICreateCommentFields>({
    resolver: zodResolver(createCommentValidation),
    defaultValues: {
      text: '',
    },
  });

  const { mutate: createComment, isLoading } = useMutation({
    mutationKey: [REACT_QUERY_KEYS.comments],
    mutationFn: async (data: ICreateCommentFields) => {
      return await CommentsService.create({
        formData: data,
        comicId,
        replyToId: parentCommentId,
      });
    },
    onError: (err) => {
      ErrorHandler.mutation(err, {
        validError: {
          withToast: false,
          action: (err) => {
            if (isInvalidResponseWithDetails(err.data)) {
              const { details } = err.data;
              const allFields = form.watch();

              details.forEach((detail) => {
                if (allFields.hasOwnProperty(detail.path)) {
                  form.setError(detail.path as keyof ICreateCommentFields, {
                    type: 'server',
                    message: detail.msg,
                  });
                } else {
                  toast({
                    variant: 'destructive',
                    title: 'Validation error not from form',
                    description: detail.msg,
                  });
                }
              });
            } else {
              toast({
                variant: 'destructive',
                title: 'Validation error',
                description: `A validation error occurred that was not caused by the server`,
              });
            }
          },
        },
      });
    },
    onSuccess: () => {
      form.reset();
      router.refresh();
      onConfirm && onConfirm();
    },
  });

  const onSubmit = (data: ICreateCommentFields) => {
    createComment(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='flex flex-col gap-1 '
      >
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
