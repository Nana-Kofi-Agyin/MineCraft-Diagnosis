import { useState } from 'react';
import { TREATMENTS } from '../../../data/treatments';
import Card from '../../../components/ui/Card';

/**
 * AccordionSection — collapsible treatment section.
 */
function AccordionSection({ icon, title, items, defaultOpen = false, accentClass = '' }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={[
          'flex w-full items-center justify-between gap-3 px-4 py-3',
          'font-semibold text-left text-sm cursor-pointer transition-colors',
          open ? `${accentClass} text-white` : 'bg-gray-50 text-gray-700 hover:bg-gray-100',
        ].join(' ')}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true">{icon}</span> {title}
        </span>
        <span aria-hidden="true" className="text-xs">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <ul className="divide-y divide-gray-100 bg-white">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 px-4 py-3 text-sm text-gray-700">
              <span className="mt-0.5 text-green-500 shrink-0" aria-hidden="true">•</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * PreventionGuide — Renders the full treatment and prevention guide
 * for a diagnosed disease/pest using collapsible accordion sections.
 * Props:
 *   treatmentKey: string — key into the TREATMENTS map (e.g. 'apply-fall-armyworm')
 */
export default function PreventionGuide({ treatmentKey }) {
  const treatment = TREATMENTS[treatmentKey];

  if (!treatment) {
    return (
      <Card className="text-center py-6 text-sm text-gray-400">
        No treatment guide available for this diagnosis.
      </Card>
    );
  }

  const sections = [
    {
      key:         'immediate',
      icon:        '🚨',
      title:       'Immediate Actions',
      items:       treatment.immediateActions,
      defaultOpen: true,
      accentClass: 'bg-red-500',
    },
    {
      key:         'chemical',
      icon:        '🧪',
      title:       'Chemical Control',
      items:       treatment.chemical,
      defaultOpen: false,
      accentClass: 'bg-blue-500',
    },
    {
      key:         'organic',
      icon:        '🌿',
      title:       'Organic / Biological Control',
      items:       treatment.organic,
      defaultOpen: false,
      accentClass: 'bg-emerald-500',
    },
    {
      key:         'prevention',
      icon:        '🛡️',
      title:       'Long-term Prevention',
      items:       treatment.prevention,
      defaultOpen: false,
      accentClass: 'bg-green-600',
    },
  ];

  return (
    <section aria-labelledby="prevention-heading">
      <h3 id="prevention-heading" className="mb-3 text-base font-bold text-gray-800">
        Treatment &amp; Prevention Guide
      </h3>
      <div className="space-y-2">
        {sections.map((s) => (
          <AccordionSection
            key={s.key}
            icon={s.icon}
            title={s.title}
            items={s.items}
            defaultOpen={s.defaultOpen}
            accentClass={s.accentClass}
          />
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-400 text-center">
        ℹ️ Always follow local regulations when applying chemical treatments.
      </p>
    </section>
  );
}
