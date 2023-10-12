import { toast } from '@/hooks/use-toast';

const converterFileToBase64 = async (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => {
      console.error(error);
      reject(null);
    };
  });
};

export const convertImgToBase64 = async (file: File): Promise<string | null> => {
  const imageBASE64 = await converterFileToBase64(file);

  if (!imageBASE64) {
    toast({
      title: 'Oops. Something went wrong!',
      description:
        'An error occurred while processing the uploaded image, please try again later',
      variant: 'destructive',
    });
    return null;
  }

  return imageBASE64;
};
