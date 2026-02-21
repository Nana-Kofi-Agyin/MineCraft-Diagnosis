/**
 * Card — a clean, bordered container component.
 * Props:
 *   padding: 'sm' | 'md' | 'lg'  (default: 'md')
 *   hover:   boolean              (adds hover lift effect)
 */

const PADDING = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export default function Card({
  children,
  padding   = 'md',
  hover     = false,
  className = '',
  ...rest
}) {
  return (
    <div
      className={[
        'rounded-2xl border border-gray-200 bg-white shadow-sm',
        hover ? 'transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer' : '',
        PADDING[padding] ?? PADDING.md,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
