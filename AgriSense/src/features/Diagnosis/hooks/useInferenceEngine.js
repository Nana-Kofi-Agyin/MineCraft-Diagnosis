import { useCallback } from 'react';
import { useDiagnosis } from '../../../context/DiagnosisContext';
import { runDiagnosis } from '../services/api';

/**
 * useInferenceEngine
 * Custom hook that wraps the Mock Diagnosis Service and wires results
 * directly into the global DiagnosisContext.
 *
 * All errors are caught here so the app never crashes on Vercel
 * even if runDiagnosis throws unexpectedly.
 *
 * Returns:
 *   diagnose()  — async function that triggers the mock inference engine
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
      // Catch any unexpected runtime errors so the app never crashes.
      const message =
        err?.message ?? 'An unexpected error occurred. Please try again.';
      console.error('[useInferenceEngine] Diagnosis failed:', err);
      actions.setError(message);
    }
  }, [state, actions]);

  return {
    diagnose,
    isLoading: state.isLoading,
    error:     state.error,
  };
}
