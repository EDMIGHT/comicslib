'use client';

import { forwardRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          ref={ref}
          {...props}
        />
        <Button
          type='button'
          variant='ghost'
          size='sm'
          tabIndex={-1}
          className='absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent'
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.value === '' || props.disabled}
        >
          {props.value !== '' &&
            (showPassword ? (
              <Icons.hide className='h-4 w-4' aria-hidden='true' />
            ) : (
              <Icons.view className='h-4 w-4' aria-hidden='true' />
            ))}
          <span className='sr-only'>{showPassword ? 'Hide password' : 'Show password'}</span>
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
