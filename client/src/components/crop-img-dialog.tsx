import 'cropperjs/dist/cropper.css';

import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef } from 'react';
import Cropper, { type ReactCropperElement } from 'react-cropper';

import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

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
        return console.error('blob error');
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
            className='h-[450px] w-[450px] object-cover'
            zoomTo={0.5}
            initialAspectRatio={1 / 1}
            preview='.img-preview'
            src={URL.createObjectURL(file)}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              cropperRef.current?.cropper.reset();
            }}
            variant='outline'
          >
            Reset Crop
          </Button>
          <Button
            onClick={() => {
              onCrop();
            }}
          >
            Confirm Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
