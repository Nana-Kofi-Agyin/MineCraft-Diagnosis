import { useDiagnosis } from '../../context/DiagnosisContext';

const STEP_LABELS = {
  'crop-selection':    { index: 1, label: 'Select Crop'       },
  'symptom-checklist': { index: 2, label: 'Choose Symptoms'   },
  'results':           { index: 3, label: 'View Diagnosis'    },
};

const STEPS = ['crop-selection', 'symptom-checklist', 'results'];

export default function Navbar() {
  const { state, actions } = useDiagnosis();
  const currentIndex = STEP_LABELS[state.step]?.index ?? 1;

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <button
          onClick={actions.reset}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          aria-label="Return to home"
        >
          <span className="text-2xl" aria-hidden="true">🌱</span>
          <span className="text-xl font-extrabold tracking-tight text-green-700 group-hover:text-green-800 transition-colors">
            AgriSense
          </span>
        </button>

        {/* Step breadcrumbs */}
        <nav aria-label="Diagnosis steps" className="flex items-center gap-1 sm:gap-2">
          {STEPS.map((stepId, idx) => {
            const num      = idx + 1;
            const isActive = state.step === stepId;
            const isDone   = currentIndex > num;
            return (
              <div key={stepId} className="flex items-center gap-1 sm:gap-2">
                <div
                  className={[
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                    isActive ? 'bg-green-600 text-white ring-2 ring-green-200' :
                    isDone   ? 'bg-green-100 text-green-700' :
                               'bg-gray-100 text-gray-400',
                  ].join(' ')}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isDone ? '✓' : num}
                </div>
                <span
                  className={[
                    'hidden sm:inline text-xs font-medium',
                    isActive ? 'text-green-700' : 'text-gray-400',
                  ].join(' ')}
                >
                  {STEP_LABELS[stepId].label}
                </span>
                {idx < STEPS.length - 1 && (
                  <span className="text-gray-300 text-xs" aria-hidden="true">›</span>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
