import { ComponentProps, ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface InputProps extends ComponentProps<'input'> {
  icon?: ReactNode;
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className={cn('flex w-full items-center pr-3', className)}>
      <input
        {...props}
        className="flex-1 px-3 py-1 text-gray-800 outline-none"
      />
      {icon && icon}
    </div>
  );
}
