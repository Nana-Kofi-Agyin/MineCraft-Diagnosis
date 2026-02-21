import { SYMPTOM_MAP } from '../../../data/symptomMap';
import { useDiagnosis } from '../../../context/DiagnosisContext';
import { useInferenceEngine } from '../hooks/useInferenceEngine';
import Button from '../../../components/ui/Button';
import ErrorAlert from '../../../components/Shared/ErrorAlert';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

/**
 * SymptomCheckbox — single selectable symptom item.
 */
function SymptomCheckbox({ symptom, checked, onChange }) {
  return (
    <label
      className={[
        'flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all duration-150',
        'min-h-[56px] select-none',
        checked
          ? 'border-green-500 bg-green-50 text-green-800'
          : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50/50',
      ].join(' ')}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={() => onChange(symptom.id)}
        aria-label={symptom.label}
      />
      {/* Custom checkbox visuals */}
      <span
        className={[
          'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors',
          checked ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 bg-white',
        ].join(' ')}
        aria-hidden="true"
      >
        {checked && (
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="1.5,6 4.5,9 10.5,3" />
          </svg>
        )}
      </span>
      <span className="text-sm font-medium leading-snug">{symptom.label}</span>
    </label>
  );
}

/**
 * SymptomSelector — Step 2 of the diagnosis wizard.
 * Renders the symptom checklist for the selected crop and
 * triggers the inference engine on submission.
 */
export default function SymptomSelector() {
  const { state, actions } = useDiagnosis();
  const { diagnose, isLoading, error } = useInferenceEngine();

  const cropData = SYMPTOM_MAP[state.selectedCrop];
  if (!cropData) return null;

  const { symptoms } = cropData;
  const selectedCount = state.activeSymptoms.length;

  return (
    <section aria-labelledby="symptom-heading" className="w-full">
      <div className="mb-6">
        <h2 id="symptom-heading" className="text-2xl font-extrabold text-gray-800">
          What symptoms do you observe?
        </h2>
        <p className="mt-1.5 text-gray-500">
          Select all symptoms visible on your&nbsp;
          <strong className="text-green-700">{state.selectedCrop}</strong> crop.
          Choose at least <strong>2</strong> for a reliable diagnosis.
        </p>
      </div>

      {/* Symptom list */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {symptoms.map((symptom) => (
          <SymptomCheckbox
            key={symptom.id}
            symptom={symptom}
            checked={state.activeSymptoms.includes(symptom.id)}
            onChange={actions.toggleSymptom}
          />
        ))}
      </div>

      {/* Selection counter */}
      <p className="mt-3 text-sm text-gray-500">
        {selectedCount === 0
          ? 'No symptoms selected yet.'
          : `${selectedCount} symptom${selectedCount > 1 ? 's' : ''} selected.`}
      </p>

      {/* Error alert */}
      {error && (
        <div className="mt-4">
          <ErrorAlert message={error} onDismiss={actions.setError.bind(null, null)} />
        </div>
      )}

      {/* Loading spinner (inline, not overlay) */}
      {isLoading && (
        <div className="mt-4">
          <LoadingSpinner message="Running forward-chaining inference engine…" />
        </div>
      )}

      {/* Action bar */}
      {!isLoading && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
          <Button
            onClick={diagnose}
            disabled={selectedCount < 1}
            size="lg"
            fullWidth
          >
            🔍&nbsp; Run Diagnosis
          </Button>
          <Button
            onClick={actions.goBack}
            variant="secondary"
            size="lg"
            fullWidth
          >
            ← Change Crop
          </Button>
        </div>
      )}
    </section>
  );
}
