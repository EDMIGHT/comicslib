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
import { toast } from '@/hooks/use-toast';
import { cn, formatBytes } from '@/lib/utils';

type FileDialogProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  onSelectFile: (file: File) => void;
  accept?: Accept;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
};

export const FileDialog: FC<FileDialogProps> = ({
  children,
  onSelectFile,
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

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        onSelectFile(file);
        setOpen(false);
      });

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0].code === 'file-too-large') {
            toast({
              variant: 'destructive',
              title: 'File size is too large',
              description: `The file size is too large, the maximum allowable size is ${formatBytes(
                maxSize
              )}`,
            });
          } else if (errors[0].code === 'file-invalid-type') {
            toast({
              variant: 'destructive',
              title: 'Invalid File Type',
              description: `You can only upload pictures as comic cover`,
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Oops, something went wrong',
              description: `An error occurred while parsing your file, please select another file`,
            });
          }
        });
      }
    },
    [onSelectFile, maxSize, setOpen]
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
                Drag & Drop file here or Click to select file
              </p>
              <p className='text-sm text-slate-500'>
                Please upload file with size less than {formatBytes(maxSize)}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
