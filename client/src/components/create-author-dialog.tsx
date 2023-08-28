import { FC } from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateAuthorForm } from './forms/create-author-form';

type CreateAuthorDialogProps = ButtonProps & {
  triggerText?: string;
};

export const CreateAuthorDialog: FC<CreateAuthorDialogProps> = ({
  variant,
  triggerText,
  className,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          {triggerText ?? 'Create author'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Author</DialogTitle>
          <CreateAuthorForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
