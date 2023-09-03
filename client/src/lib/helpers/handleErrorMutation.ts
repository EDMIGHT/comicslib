import { AxiosError } from 'axios';

import { toast } from '@/hooks/use-toast';

type ErrorMessageSchema = {
  title: string;
  description?: string;
};

type ErrorMessages = {
  validError?: ErrorMessageSchema;
  authError?: ErrorMessageSchema;
  notFoundError?: ErrorMessageSchema;
  conflictError?: ErrorMessageSchema;
};

export const handleErrorMutation = (err: unknown, errMessages?: ErrorMessages) => {
  if (err instanceof AxiosError) {
    if (err.response?.status === 400) {
      return toast({
        variant: 'destructive',
        title: errMessages?.validError?.title ?? 'Incorrectly entered data',
        description:
          errMessages?.validError?.description ??
          'An error occurred while validating the data you entered, please check that you entered for correctness',
      });
    } else if (err.response?.status === 401) {
      return toast({
        variant: 'destructive',
        title: errMessages?.authError?.title ?? 'Authorization Error',
        description: errMessages?.authError?.description ?? 'Please login or refresh the page',
      });
    } else if (err.response?.status === 404) {
      return toast({
        variant: 'destructive',
        title: errMessages?.notFoundError?.title ?? 'The entered data does not exist',
        description:
          errMessages?.notFoundError?.description ??
          'The data that was entered does not exist, please enter the correct information',
      });
    } else if (err.response?.status === 409) {
      return toast({
        variant: 'destructive',
        title: errMessages?.conflictError?.title ?? 'Conflict',
        description:
          errMessages?.conflictError?.description ??
          'The data you entered already exists in the database, perhaps someone managed to create it before you',
      });
    }
  }
  return toast({
    variant: 'destructive',
    title: 'Oops. Something went wrong!',
    description: 'Something went wrong, please try again later',
  });
};
