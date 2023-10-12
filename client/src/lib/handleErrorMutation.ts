import { AxiosError } from 'axios';

import { toast } from '@/hooks/use-toast';

type ErrorMessageSchema = {
  title: string;
  description?: string;
  action?: () => void;
};

type ErrorMessages = {
  validError?: ErrorMessageSchema;
  authError?: ErrorMessageSchema;
  notFoundError?: ErrorMessageSchema;
  conflictError?: ErrorMessageSchema;
  forbiddenError?: ErrorMessageSchema;
};

export const handleErrorMutation = (err: unknown, errConfig?: ErrorMessages) => {
  if (err instanceof AxiosError) {
    if (err.response?.status === 400) {
      errConfig?.validError?.action && errConfig?.validError?.action();
      return toast({
        variant: 'destructive',
        title: errConfig?.validError?.title ?? 'Incorrectly entered data',
        description:
          errConfig?.validError?.description ??
          'An error occurred while validating the data you entered, please check that you entered for correctness',
      });
    } else if (err.response?.status === 401) {
      errConfig?.authError?.action && errConfig?.authError?.action();
      return toast({
        variant: 'destructive',
        title: errConfig?.authError?.title ?? 'Authorization Error',
        description: errConfig?.authError?.description ?? 'Please login or refresh the page',
      });
    } else if (err.response?.status === 403) {
      errConfig?.forbiddenError?.action && errConfig?.forbiddenError?.action();
      return toast({
        variant: 'destructive',
        title: errConfig?.forbiddenError?.title ?? 'Limit has been reached',
        description:
          errConfig?.forbiddenError?.description ??
          'Please, before repeating the action, provide free space for the created object',
      });
    } else if (err.response?.status === 404) {
      errConfig?.notFoundError?.action && errConfig?.notFoundError?.action();
      return toast({
        variant: 'destructive',
        title: errConfig?.notFoundError?.title ?? 'The entered data does not exist',
        description:
          errConfig?.notFoundError?.description ??
          'The data that was entered does not exist, please enter the correct information',
      });
    } else if (err.response?.status === 409) {
      errConfig?.conflictError?.action && errConfig?.conflictError?.action();
      return toast({
        variant: 'destructive',
        title: errConfig?.conflictError?.title ?? 'Conflict',
        description:
          errConfig?.conflictError?.description ??
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
