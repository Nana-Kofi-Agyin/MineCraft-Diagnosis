/**
 * Button — reusable Tailwind button with variant and size support.
 * Variants: 'primary' | 'secondary' | 'danger' | 'ghost'
 * Sizes:    'sm' | 'md' | 'lg'
 */

const VARIANT_CLASSES = {
  primary:   'bg-green-600 hover:bg-green-700 text-white border-transparent shadow-sm',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-sm',
  danger:    'bg-red-600 hover:bg-red-700 text-white border-transparent shadow-sm',
  ghost:     'bg-transparent hover:bg-gray-100 text-gray-600 border-transparent',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2.5 text-base min-h-[44px]',
  lg: 'px-6 py-3.5 text-lg min-h-[52px]',
};

export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  fullWidth = false,
  disabled  = false,
  onClick,
  type     = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl border font-semibold',
        'transition-all duration-150 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-green-500 focus-visible:ring-offset-2 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary,
        SIZE_CLASSES[size]       ?? SIZE_CLASSES.md,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
