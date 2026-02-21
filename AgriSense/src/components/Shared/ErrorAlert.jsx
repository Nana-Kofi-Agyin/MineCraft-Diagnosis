/**
 * ErrorAlert — displays an error message with an optional retry action.
 * Props:
 *   message:  string
 *   onRetry:  function | null
 *   onDismiss: function | null
 */

export default function ErrorAlert({ message, onRetry, onDismiss }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
    >
      <span className="mt-0.5 text-xl" aria-hidden="true">⚠️</span>
      <div className="flex-1">
        <p className="font-semibold text-red-800">Something went wrong</p>
        <p className="mt-0.5 text-sm text-red-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            Try again
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="text-red-400 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
        >
          ✕
        </button>
      )}
    </div>
  );
}
