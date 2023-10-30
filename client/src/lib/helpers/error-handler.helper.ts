import { AxiosError, AxiosResponse } from 'axios';
import { FileError } from 'react-dropzone';

import { toast } from '@/hooks/use-toast';

type ErrorMessageSchema = {
  title?: string;
  description?: string;
  action?: (err: AxiosResponse) => void;
  withToast?: boolean;
};

type ErrorMessages = {
  validError: ErrorMessageSchema;
  authError: ErrorMessageSchema;
  notFoundError: ErrorMessageSchema;
  conflictError: ErrorMessageSchema;
  forbiddenError: ErrorMessageSchema;
};

const baseOfError = (
  err: AxiosResponse,
  defaultSchema: ErrorMessageSchema,
  errorSchema: ErrorMessageSchema | undefined
) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    action: defaultAction,
    withToast: defaultWithToast = true,
  } = defaultSchema;

  if (errorSchema?.action) {
    errorSchema?.action(err);
  } else if (defaultAction) {
    defaultAction(err);
  }

  if (errorSchema?.withToast ?? defaultWithToast) {
    toast({
      variant: 'destructive',
      title: errorSchema?.title ?? defaultTitle,
      description: errorSchema?.description ?? defaultDescription,
    });
  }
};

const baseOfErrorHandler = ({
  err,
  errConfig,
  defaultErrorConfig,
}: {
  err: unknown;
  errConfig?: Partial<ErrorMessages>;
  defaultErrorConfig: ErrorMessages;
}) => {
  if (err instanceof AxiosError) {
    if (err.response?.status === 400) {
      return baseOfError(err.response, defaultErrorConfig.validError, errConfig?.validError);
    } else if (err.response?.status === 401) {
      return baseOfError(err.response, defaultErrorConfig.authError, errConfig?.authError);
    } else if (err.response?.status === 403) {
      return baseOfError(
        err.response,
        defaultErrorConfig.forbiddenError,
        errConfig?.forbiddenError
      );
    } else if (err.response?.status === 404) {
      return baseOfError(
        err.response,
        defaultErrorConfig.notFoundError,
        errConfig?.notFoundError
      );
    } else if (err.response?.status === 409) {
      return baseOfError(
        err.response,
        defaultErrorConfig.conflictError,
        errConfig?.conflictError
      );
    } else if (err.response?.status && err.response?.status > 500) {
      return toast({
        variant: 'destructive',
        title: 'Server error',
        description: 'An error occurred on the server side, please try again later',
      });
    }
  }

  return toast({
    variant: 'destructive',
    title: 'Oops. Something went wrong!',
    description: 'Something went wrong, please try again later',
  });
};

export class ErrorHandler {
  public static query(err: unknown, errConfig?: Partial<ErrorMessages>) {
    baseOfErrorHandler({
      err,
      errConfig,
      defaultErrorConfig: {
        validError: {
          title: 'Invalid request parameters',
          description: 'Please remove the parameters in the query string after the "?"',
        },
        authError: {
          title: 'Authorization Error',
          description: 'You are trying to obtain information that you do not have access to',
        },
        forbiddenError: {
          title: 'Access Denied',
          description: 'You do not have permission to access this resource.',
        },
        notFoundError: {
          title: 'The entered data does not exist',
          description:
            'The data that was entered does not exist, please enter the correct information',
        },
        conflictError: {
          title: 'Conflict',
          description: 'The requested operation cannot be completed due to a conflict.',
        },
      },
    });
  }
  public static mutation(err: unknown, errConfig?: Partial<ErrorMessages>) {
    baseOfErrorHandler({
      err,
      errConfig,
      defaultErrorConfig: {
        validError: {
          title: 'Incorrectly entered data',
          description:
            'An error occurred while validating the data you entered, please check that you entered for correctness',
        },
        authError: {
          title: 'Authorization Error',
          description: 'Please login or refresh the page',
        },
        forbiddenError: {
          title: 'Limit has been reached',
          description:
            'Please, before repeating the action, provide free space for the created object',
        },
        notFoundError: {
          title: 'The entered data does not exist',
          description:
            'The data that was entered does not exist, please enter the correct information',
        },
        conflictError: {
          title: 'Conflict',
          description:
            'The data you entered already exists in the database, perhaps someone managed to create it before you',
        },
      },
    });
  }
  public static file(
    err: FileError,
    { formattedMaxSize, maxFiles }: { formattedMaxSize: string; maxFiles: number }
  ) {
    if (err.code === 'file-too-large') {
      toast({
        variant: 'destructive',
        title: 'File size is too large',
        description: `The file size is too large, the maximum allowable size is ${formattedMaxSize}`,
      });
    } else if (err.code === 'file-invalid-type') {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: `You can only upload pictures as comic cover`,
      });
    } else if (err.code === 'too-many-files') {
      toast({
        variant: 'destructive',
        title: 'Too many files',
        description: `You have selected too many files at once, please select no more than ${maxFiles} ${
          maxFiles > 1 ? 'files' : 'file'
        } `,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Oops, something went wrong',
        description: `An error occurred while parsing your file, please select another file`,
      });
    }
  }
}
