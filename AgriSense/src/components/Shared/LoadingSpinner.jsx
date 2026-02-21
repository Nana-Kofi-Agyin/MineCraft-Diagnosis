/**
 * LoadingSpinner — animated full-area overlay while the inference engine runs.
 * Props:
 *   message: string (optional)
 *   size:    'sm' | 'md' | 'lg'
 */

const SIZE_CLASSES = {
  sm: 'h-6 w-6 border-2',
  md: 'h-10 w-10 border-4',
  lg: 'h-14 w-14 border-4',
};

export default function LoadingSpinner({
  message = 'Analysing symptoms…',
  size    = 'md',
  overlay = false,
}) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div
        className={[
          'animate-spin rounded-full border-green-200 border-t-green-600',
          SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
        ].join(' ')}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="text-sm font-medium text-gray-600">{message}</p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}
