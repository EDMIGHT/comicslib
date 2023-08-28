import { AxiosError } from 'axios';

import { toast } from '@/hooks/use-toast';

export const handleErrorMutation = (err: unknown) => {
  if (err instanceof AxiosError) {
    if (err.response?.status === 401) {
      return toast({
        variant: 'destructive',
        title: 'Authorization Error',
        description: 'Please login or refresh the page',
      });
    } else if (err.response?.status === 400) {
      return toast({
        variant: 'destructive',
        title: 'Incorrectly entered data',
        description:
          'An error occurred while validating the data you entered, please check that you entered for correctness',
      });
    } else if (err.response?.status === 409) {
      return toast({
        variant: 'destructive',
        title: 'Conflict',
        description:
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
