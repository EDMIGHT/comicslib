'use client';

import { FC, ReactNode, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/ui/icons';

type FileDialogProps = {
  children: ReactNode;
  onSelectFile: (file: File) => void;
};

export const FileDialog: FC<FileDialogProps> = ({ children, onSelectFile }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <label htmlFor='image'>
          <div className=' relative flex h-[270px] w-full cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded border border-dashed transition-colors hover:bg-muted'>
            <Icons.upload className='h-10 w-10' />

            <span className='text-sm font-medium'>Click to upload</span>
            <input
              id='image'
              type='file'
              hidden
              onChange={(e) => {
                const file = e.target?.files && e.target?.files[0];
                if (file) {
                  onSelectFile(file);
                  setOpen(false);
                }
              }}
            />
          </div>
        </label>
      </DialogContent>
    </Dialog>
  );
};
