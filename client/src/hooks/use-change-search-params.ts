import { usePathname, useRouter } from 'next/navigation';

export const useChangeSearchParams = (): [(value: string) => void, () => void] => {
  const router = useRouter();
  const pathname = usePathname();

  const change = (value: string) => {
    router.push(pathname + (pathname.includes('?') ? '&' : '?') + value);
  };

  const reset = () => {
    router.push(pathname);
  };

  return [change, reset];
};
