import { useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      key === targetKey && setIsKeyPressed(true);
    };

    window.addEventListener('keydown', downHandler);

    return () => {
      setIsKeyPressed(false);
      window.removeEventListener('keydown', downHandler);
    };
  }, [targetKey]);

  return isKeyPressed;
};
