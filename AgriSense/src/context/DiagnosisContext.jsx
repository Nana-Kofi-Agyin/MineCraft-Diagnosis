import { createContext, useContext, useReducer } from 'react';

/**
 * DiagnosisContext
 * Global state for the active diagnosis session.
 * Provides: selectedCrop, activeSymptoms, diagnosisResult, step
 */

// ─── Initial State ────────────────────────────────────────────────
const initialState = {
  step:            'crop-selection',  // 'crop-selection' | 'symptom-checklist' | 'results'
  selectedCrop:    null,              // 'Maize' | 'Tomato' | 'Cassava'
  activeSymptoms:  [],                // string[] of symptom IDs
  diagnosisResult: null,              // { disease, severity, treatment, confidence } | null
  isLoading:       false,
  error:           null,
};

// ─── Reducer ──────────────────────────────────────────────────────
function diagnosisReducer(state, action) {
  switch (action.type) {

    case 'SELECT_CROP':
      return {
        ...initialState,
        step:         'symptom-checklist',
        selectedCrop: action.payload,
      };

    case 'TOGGLE_SYMPTOM': {
      const id = action.payload;
      const already = state.activeSymptoms.includes(id);
      return {
        ...state,
        activeSymptoms: already
          ? state.activeSymptoms.filter((s) => s !== id)
          : [...state.activeSymptoms, id],
      };
    }

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null };

    case 'SET_RESULT':
      return {
        ...state,
        isLoading:       false,
        diagnosisResult: action.payload,
        step:            'results',
      };

    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'GO_BACK':
      return {
        ...state,
        step:            state.step === 'results' ? 'symptom-checklist' : 'crop-selection',
        diagnosisResult: state.step === 'results' ? null : state.diagnosisResult,
        error:           null,
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// ─── Context & Provider ───────────────────────────────────────────
const DiagnosisContext = createContext(null);

export function DiagnosisProvider({ children }) {
  const [state, dispatch] = useReducer(diagnosisReducer, initialState);

  const actions = {
    selectCrop:      (crop)    => dispatch({ type: 'SELECT_CROP',     payload: crop }),
    toggleSymptom:   (id)      => dispatch({ type: 'TOGGLE_SYMPTOM',  payload: id   }),
    setLoading:      (bool)    => dispatch({ type: 'SET_LOADING',     payload: bool }),
    setResult:       (result)  => dispatch({ type: 'SET_RESULT',      payload: result }),
    setError:        (message) => dispatch({ type: 'SET_ERROR',       payload: message }),
    goBack:          ()        => dispatch({ type: 'GO_BACK' }),
    reset:           ()        => dispatch({ type: 'RESET' }),
  };

  return (
    <DiagnosisContext.Provider value={{ state, actions }}>
      {children}
    </DiagnosisContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────
export function useDiagnosis() {
  const ctx = useContext(DiagnosisContext);
  if (!ctx) {
    throw new Error('useDiagnosis must be used within a <DiagnosisProvider>');
  }
  return ctx;
}

export default DiagnosisContext;
