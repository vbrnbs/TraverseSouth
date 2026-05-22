import React from 'react';

type ButtonVariant = 
  | 'primary' 
  | 'primary-on-light' 
  | 'brand' 
  | 'secondary-dark' 
  | 'ghost-dark' 
  | 'app-tab';

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButtonProps = BaseButtonProps & 
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: never;
  };

type ButtonAsLinkProps = BaseButtonProps & 
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClass = `button button-${variant} ${className}`.trim();

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props as any;
    return (
      <a href={href} className={baseClass} {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={baseClass} {...(props as any)}>
      {children}
    </button>
  );
}

