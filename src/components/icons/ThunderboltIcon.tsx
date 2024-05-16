import { cn } from '@/utils/cn';

interface ThunderboltIconProps {
  className?: string;
}

export function ThunderboltIcon({ className }: ThunderboltIconProps) {
  return (
    <svg
      className={cn('text-blue', className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9999 5.27216H10.0659L13.6034 0.802516C13.6767 0.707874 13.6106 0.570374 13.4909 0.570374H6.64273C6.59273 0.570374 6.54451 0.597159 6.51951 0.641802L1.89273 8.63287C1.83737 8.72752 1.90523 8.84716 2.01594 8.84716H5.13023L3.5338 15.2329C3.49987 15.3722 3.66773 15.4704 3.7713 15.3704L14.0981 5.5168C14.1909 5.4293 14.1284 5.27216 13.9999 5.27216ZM5.61059 11.9364L6.68737 7.63287H3.87666L7.26237 1.78645H11.2731L7.55344 6.48823H11.3213L5.61059 11.9364Z"
        fill="currentColor"
      />
    </svg>
  );
}
