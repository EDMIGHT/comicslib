'use client';

import 'cropperjs/dist/cropper.css';

import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef } from 'react';
import Cropper, { type ReactCropperElement } from 'react-cropper';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

type CropImgDialogProps = {
  file: File;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: (file: File) => void;
};

export const CropImgDialog: FC<CropImgDialogProps> = ({ file, open, setOpen, onConfirm }) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = useCallback(() => {
    if (!cropperRef.current) return;

    const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();

    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        return toast({
          title: 'Oops, something went wrong',
          description: 'Please refresh the page or choose another photo',
        });
      }
      const croppedImage = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });

      onConfirm(croppedImage);
    });
  }, [file.name, file.type, onConfirm]);

  useEffect(() => {
    const handlerKeyboardClick = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onCrop();
      }
    };

    document.addEventListener('keydown', handlerKeyboardClick);

    return () => document.removeEventListener('keydown', handlerKeyboardClick);
  }, [onCrop]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='space-y-2'>
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className='p-2'>
          <Cropper
            ref={cropperRef}
            className='h-auto w-full object-cover lg:h-[450px] lg:w-[450px]'
            src={URL.createObjectURL(file)}
            zoomTo={0.5}
            initialAspectRatio={1 / 1}
            aspectRatio={1}
            dragMode='move'
            viewMode={1}
            minCropBoxHeight={100}
            minCropBoxWidth={100}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        </div>
        <DialogFooter className='gap-2'>
          <Button
            onClick={() => {
              cropperRef.current?.cropper.reset();
            }}
            variant='outline'
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              onCrop();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
