'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, ReactNode, useState } from 'react';

import { cn } from '@/utils/cn';
import { ArrowDownIcon } from './icons/ArrowDownIcon';

interface CollapsibleProps extends PropsWithChildren {
  className?: string;
  title: ReactNode;
  icon?: ReactNode;
}

export function Collapsible({
  className,
  title,
  icon,
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  const hasNoChildren = !children;

  const heightAnimation = {
    unmount: {
      height: '0px',
      transition: { duration: 0.2, times: [0.4, 0.2, 1] },
    },
    mount: {
      height: 'auto',
      transition: { duration: 0.2, times: [0.4, 0.2, 1] },
    },
  };

  const mainAnimation = {
    unmount: {
      transition: { duration: 0.3, ease: 'linear' },
    },
    mount: {
      transition: { duration: 0.3, ease: 'linear' },
    },
  };

  function handleToggle() {
    setOpen((prevState) => !prevState);
  }

  return (
    <div className={cn('w-full min-w-fit font-roboto', className)}>
      <button
        className={cn(
          'flex w-full items-center whitespace-nowrap p-[1.5px] transition-colors hover:bg-blue-100',
          hasNoChildren && 'pointer-events-none pl-0.5'
        )}
        onClick={handleToggle}
        disabled={hasNoChildren}
      >
        <span
          className={cn(
            'flex h-6 w-6 items-center justify-center transition-transform',
            hasNoChildren && 'hidden',
            open && 'rotate-180'
          )}
        >
          <ArrowDownIcon />
        </span>
        {title}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden pl-3"
            initial="unmount"
            exit="unmount"
            animate={open ? 'mount' : 'unmount'}
            variants={heightAnimation}
          >
            <motion.div
              className="border-l pl-2.5"
              initial="unmount"
              exit="unmount"
              animate={open ? 'mount' : 'unmount'}
              variants={mainAnimation}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
