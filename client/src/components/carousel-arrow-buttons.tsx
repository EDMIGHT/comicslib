'use client';

import { EmblaCarouselType } from 'embla-carousel-react';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import { Icons } from './ui/icons';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  selectedIndex: number;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    selectedIndex,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const PrevButton: React.FC<PropType> = ({ children, className, ...restProps }) => {
  return (
    <button
      type='button'
      {...restProps}
      className={cn(
        'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full enabled:cursor-pointer enabled:hover:bg-black/40 disabled:text-muted transition-colors',
        className
      )}
    >
      <Icons.back />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = ({ children, className, ...restProps }) => {
  return (
    <button
      type='button'
      {...restProps}
      className={cn(
        'flex min-h-[2.5rem] min-w-[2.5rem] cursor-pointer items-center justify-center rounded-full enabled:cursor-pointer enabled:hover:bg-black/40 disabled:text-muted transition-colors',
        className
      )}
    >
      <Icons.next />
      {children}
    </button>
  );
};
