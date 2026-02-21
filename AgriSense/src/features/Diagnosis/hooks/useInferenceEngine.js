import { useCallback } from 'react';
import { useDiagnosis } from '../../../context/DiagnosisContext';
import { runDiagnosis } from '../services/api';

/**
 * useInferenceEngine
 * Custom hook that wraps the diagnosis service and wires results
 * directly into the global DiagnosisContext.
 *
 * Returns:
 *   diagnose()  — async function that triggers the inference engine
 *   isLoading   — boolean
 *   error       — string | null
 */
export function useInferenceEngine() {
  const { state, actions } = useDiagnosis();

  const diagnose = useCallback(async () => {
    const { selectedCrop, activeSymptoms } = state;

    if (!selectedCrop) {
      actions.setError('No crop selected. Please go back and choose a crop.');
      return;
    }

    if (!activeSymptoms || activeSymptoms.length === 0) {
      actions.setError('Please select at least one symptom before running diagnosis.');
      return;
    }

    actions.setLoading(true);

    try {
      const result = await runDiagnosis(selectedCrop, activeSymptoms);
      actions.setResult(result);
    } catch (err) {
      console.error('[useInferenceEngine] Diagnosis failed:', err);
      actions.setError(
        err?.message
          ?? 'Unable to reach the inference engine. Please try again.'
      );
    }
  }, [state, actions]);

  return {
    diagnose,
    isLoading: state.isLoading,
    error:     state.error,
  };
}
