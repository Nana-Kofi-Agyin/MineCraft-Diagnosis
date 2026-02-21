/**
 * Badge — inline severity / status label.
 * Props:
 *   severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info'
 *   label:    string (falls back to severity)
 */

const SEVERITY_STYLES = {
  Critical: 'bg-red-100 text-red-800 border-red-300',
  High:     'bg-orange-100 text-orange-800 border-orange-300',
  Medium:   'bg-yellow-100 text-yellow-800 border-yellow-300',
  Low:      'bg-green-100 text-green-800 border-green-300',
  Info:     'bg-blue-100 text-blue-800 border-blue-300',
};

export default function Badge({ severity = 'Info', label, className = '' }) {
  const styles = SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.Info;
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        styles,
        className,
      ].join(' ')}
    >
      {label ?? severity}
    </span>
  );
}
