import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: ReactNode;
  isLink?: boolean;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  type = 'button',
  className = '',
  children,
  isLink = false,
  href,
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseClasses = 
    "w-full bg-black cursor-pointer text-white py-2 px-4 rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black";

  if (isLink) {
    return (
      <a
        href={href}
        className={cn(baseClasses, "inline-block text-center", className)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={cn(baseClasses, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}