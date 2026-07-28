import { motion } from 'framer-motion';

/**
 * Button — reusable base button component.
 *
 * Props:
 *  variant  – 'primary' | 'outline' | 'ghost'   (default: 'primary')
 *  size     – 'sm' | 'md' | 'lg'                (default: 'md')
 *  as       – rendered element: 'button' | 'a'  (default: 'button')
 *  All other native button/anchor props are forwarded.
 */

const variantClasses = {
  primary: 'text-white shadow-lg focus:ring-2',
  outline:
    'bg-white dark:bg-gray-900 border shadow focus:ring-2',
  ghost:
    'bg-transparent focus:ring-2',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-7 py-3 text-base rounded-lg',
  lg: 'px-9 py-4 text-lg rounded-xl',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  as = 'button',
  className = '',
  style,
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-semibold transition focus:outline-none select-none';
  const classes = [base, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ');

  const MotionTag = motion.create(as);

  const variantStyle = {
    primary: {
      backgroundImage: 'linear-gradient(to right, var(--theme-primary), var(--theme-secondary))',
      color: '#ffffff',
      borderColor: 'var(--theme-primary)',
      '--tw-ring-color': 'var(--theme-primary)',
    },
    outline: {
      color: 'var(--theme-primary)',
      borderColor: 'var(--theme-primary)',
      '--tw-ring-color': 'var(--theme-primary)',
    },
    ghost: {
      color: 'var(--theme-primary)',
      '--tw-ring-color': 'var(--theme-primary)',
    },
  };

  return (
    <MotionTag
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      style={{ ...(variantStyle[variant] || {}), ...(style || {}) }}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default Button;
