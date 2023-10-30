'use client';

import { FC, HTMLAttributes, ReactNode, useCallback, useState } from 'react';
import {
  type Accept,
  type FileRejection,
  type FileWithPath,
  useDropzone,
} from 'react-dropzone';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';
import { ErrorHandler } from '@/lib/helpers/error-handler.helper';
import { Formatter } from '@/lib/helpers/formatter.helper';
import { cn } from '@/lib/utils';

type FileDialogProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  onSelectFiles: (files: File[]) => void;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
};

export const FileDialog: FC<FileDialogProps> = ({
  children,
  onSelectFiles,
  accept = {
    'image/*': [],
  },
  maxSize = 1024 * 1024 * 3,
  maxFiles = 1,
  disabled = false,
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const isMoreThanOneMaxFiles = maxFiles > 1;
  const formattedMaxSize = Formatter.bytes(maxSize);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        onSelectFiles(acceptedFiles);
        setOpen(false);
      }

      if (rejectedFiles.length > 0) {
        ErrorHandler.file(rejectedFiles[0].errors[0], {
          formattedMaxSize,
          maxFiles,
        });
      }
    },
    [formattedMaxSize, maxFiles, onSelectFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='space-y-2'>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps({
            className: cn(
              'relative flex h-56 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
              'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isDragActive && 'border-muted-foreground/50',
              disabled && 'pointer-events-none opacity-60',
              className
            ),
            ...props,
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className='flex flex-col items-center gap-2 text-muted-foreground sm:px-5'>
              <Icons.uploadCloud
                className={cn('h-10 w-10', isDragActive && 'animate-bounce')}
                aria-hidden='true'
              />
              <p className='text-base font-medium'>Drop the file here</p>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-1 sm:px-5'>
              <Icons.uploadCloud
                className='h-10 w-10 text-muted-foreground'
                aria-hidden='true'
              />
              <p className='mt-2 text-base font-medium text-muted-foreground'>
                Drag & Drop file here or Click to select{' '}
                {isMoreThanOneMaxFiles ? 'files' : 'file'}
              </p>
              <p className='text-sm text-slate-500'>
                Please upload {isMoreThanOneMaxFiles ? `up to ${maxFiles} files` : 'file'} with
                size less than {formattedMaxSize}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
