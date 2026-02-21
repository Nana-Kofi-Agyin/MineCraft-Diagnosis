/**
 * formatter.js
 * Utility helpers for formatting diagnosis results and treatment text
 * for display in the AgriSense UI.
 */

/**
 * Maps a severity string to Tailwind colour classes for badge rendering.
 * @param {string} severity - 'Critical' | 'High' | 'Medium' | 'Low'
 * @returns {{ bg: string, text: string, border: string }}
 */
export function getSeverityClasses(severity) {
  switch (severity) {
    case 'Critical':
      return { bg: 'bg-red-100',    text: 'text-red-800',    border: 'border-red-400'    };
    case 'High':
      return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-400' };
    case 'Medium':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-400' };
    default:
      return { bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-400'  };
  }
}

/**
 * Returns a human-readable confidence percentage string based on the
 * ratio of matched symptoms to the rule's required symptoms.
 * @param {number} matched - Number of symptoms matched
 * @param {number} total   - Total symptoms in the rule
 * @returns {string} e.g. "83%"
 */
export function formatConfidence(matched, total) {
  if (!total) return '0%';
  const pct = Math.round((matched / total) * 100);
  return `${pct}%`;
}

/**
 * Capitalises the first letter of every word in a string.
 * @param {string} str
 * @returns {string}
 */
export function titleCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats a flat string of treatment notes into a list of trimmed sentences.
 * Useful when raw text from the knowledge base needs list rendering.
 * @param {string} text - Raw text, sentences separated by periods or newlines
 * @returns {string[]}
 */
export function parseTreatmentText(text) {
  if (!text) return [];
  return text
    .split(/[.\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Returns a short summary sentence for a diagnosis result.
 * @param {string} crop    - e.g. 'Maize'
 * @param {string} disease - e.g. 'Fall Armyworm'
 * @param {string} severity
 * @returns {string}
 */
export function buildDiagnosisSummary(crop, disease, severity) {
  return `Your ${crop} crop shows signs of ${disease}. Severity level: ${severity}.`;
}

/**
 * Formats a Date object or ISO string into a readable timestamp.
 * @param {Date|string} date
 * @returns {string} e.g. "21 Feb 2026, 14:35"
 */
export function formatTimestamp(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleString('en-GB', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  });
}
