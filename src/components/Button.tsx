import { ComponentProps, ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface ButtonProps extends ComponentProps<'button'> {
  icon?: ReactNode;
  variant?: 'base' | 'small';
  noBorder?: boolean;
  isSelected?: boolean;
}

export function Button({
  className,
  icon,
  variant = 'base',
  noBorder = false,
  isSelected = false,
  children,
  ...props
}: ButtonProps) {
  const isSmallVariant = variant === 'small';

  return (
    <button
      {...props}
      className={cn(
        'group flex items-center gap-1.5 rounded-[3px] text-neutral-500 transition-colors hover:bg-blue/80 hover:text-white',
        !isSmallVariant && 'py-1.5 pl-3.5 pr-4',
        isSmallVariant && 'px-2 py-1',
        !noBorder && 'border',
        className,
        isSelected && 'bg-blue text-white'
      )}
      data-selected={isSelected ? 'yes' : 'no'}
    >
      {icon && icon}
      <span
        className={cn('text-sm font-semibold', isSmallVariant && 'text-xs')}
      >
        {children}
      </span>
    </button>
  );
}
