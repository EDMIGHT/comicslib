import { useCallback, useRef, useState } from 'react';

// https://mantine.dev/hooks/use-intersection/

export function useIntersection<T extends HTMLElement = any>(
  options?: ConstructorParameters<typeof IntersectionObserver>[1]
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observer = useRef<IntersectionObserver | null>();

  const ref = useCallback(
    (element: T | null) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }

      if (element === null) {
        setEntry(null);
        return;
      }

      observer.current = new IntersectionObserver(([_entry]) => {
        setEntry(_entry);
      }, options);

      observer.current.observe(element);
    },
    [options?.rootMargin, options?.root, options?.threshold]
  );

  return { ref, entry };
}
