import { useDiagnosis } from '../../context/DiagnosisContext';
import CropSelection from '../CropSelection/CropSelection';
import SymptomSelector from './components/SymptomSelector';
import ResultDisplay from './components/ResultDisplay';

/**
 * StepIndicator — thin animated progress bar at the top of the wizard.
 */
function StepIndicator({ step }) {
  const progress =
    step === 'crop-selection'    ? '33%'  :
    step === 'symptom-checklist' ? '66%'  :
                                   '100%';
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-500"
        style={{ width: progress }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Diagnosis progress"
      />
    </div>
  );
}

/**
 * DiagnosisSystem
 * ──────────────────────────────────────────────────────────────────
 * The heart of AgriSense — a three-step wizard that routes between:
 *   1. CropSelection   — user picks Maize, Tomato, or Cassava
 *   2. SymptomSelector — user checks observable symptoms
 *   3. ResultDisplay   — inference engine result + treatment guide
 *
 * All state lives in DiagnosisContext so child components can read
 * and update it without prop drilling.
 */
export default function DiagnosisSystem() {
  const { state } = useDiagnosis();

  return (
    <main
      className="w-full flex-1"
      aria-live="polite"
    >
      {/* Progress bar spans the full content column */}
      <div className="w-full mb-6">
        <StepIndicator step={state.step} />
      </div>

      {state.step === 'crop-selection'    && <CropSelection   />}
      {state.step === 'symptom-checklist' && <SymptomSelector />}
      {state.step === 'results'           && <ResultDisplay   />}
    </main>
  );
}
