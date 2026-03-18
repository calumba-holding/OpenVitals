import type React from 'react';
import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button as ButtonPrimitive, buttonVariants } from '@/components/ui/button';

const iconButtonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 text-white shadow-xs hover:bg-neutral-800',
        outline: 'border border-neutral-200 bg-white shadow-xs hover:bg-neutral-50 text-neutral-700',
        secondary: 'bg-neutral-100 text-neutral-700 shadow-xs hover:bg-neutral-200',
        ghost: 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900',
      },
      size: {
        xs: 'h-7 w-7 p-1 rounded-md',
        sm: 'h-8 w-8 gap-2',
        default: 'h-9 w-9 gap-2',
        lg: 'h-10 w-10 gap-2',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  }
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    text?: ReactNode | string;
    loading?: boolean;
    icon?: ReactNode;
    right?: ReactNode;
  };

function Button({
  className,
  variant,
  size,
  text,
  loading,
  icon,
  right,
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.onClick ? 'button' : 'submit'}
      className={cn(
        'group flex items-center justify-center whitespace-nowrap rounded-md border text-sm',
        buttonVariants({ variant, size }),
        (props.disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        icon
      ) : null}
      {text && <span className="min-w-0 truncate font-medium">{text}</span>}
      {right}
    </button>
  );
}

export type IconButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof iconButtonVariants> & {
    icon?: ReactNode;
    loading?: boolean;
  };

function IconButton({ className, variant, size, icon, loading, ...props }: IconButtonProps) {
  return (
    <button
      type={props.onClick ? 'button' : 'submit'}
      className={cn(
        iconButtonVariants({ variant, size }),
        (props.disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        icon
      )}
    </button>
  );
}

export { Button, IconButton, ButtonPrimitive, buttonVariants, iconButtonVariants };
