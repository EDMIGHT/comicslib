import { useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      key === targetKey && setIsKeyPressed(true);
    };
    const upHandler = ({ key }: KeyboardEvent) => {
      key === targetKey && setIsKeyPressed(false);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return isKeyPressed;
};
