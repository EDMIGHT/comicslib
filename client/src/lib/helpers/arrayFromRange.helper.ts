export const arrayFromRange = (min: number, max: number): number[] => {
  return Array.from({ length: max - min + 1 }, (_, index) => index + min);
};
