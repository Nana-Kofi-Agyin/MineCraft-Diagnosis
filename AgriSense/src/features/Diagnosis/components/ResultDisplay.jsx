import { useDiagnosis } from '../../../context/DiagnosisContext';
import { DIAGNOSIS_RULES } from '../../../data/mockData';
import Badge from '../../../components/ui/Badge';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import PreventionGuide from './PreventionGuide';
import { buildDiagnosisSummary, formatTimestamp } from '../../../utils/formatter';

/**
 * ConfidenceMeter — visual progress bar showing inference confidence.
 */
function ConfidenceMeter({ confidence }) {
  const pct = parseInt(confidence, 10) || 0;
  const color =
    pct >= 80 ? 'bg-green-500'  :
    pct >= 50 ? 'bg-yellow-500' :
                'bg-red-500';

  return (
    <div className="mt-1">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>Confidence</span>
        <span className="font-semibold">{confidence}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

/**
 * NoMatchResult — shown when the inference engine cannot fire any rule.
 */
function NoMatchResult({ onGoBack, onReset }) {
  return (
    <Card className="text-center py-10">
      <p className="text-5xl mb-4" aria-hidden="true">🤔</p>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Could not determine a diagnosis</h3>
      <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
        The selected symptoms do not match any known disease or pest pattern in our
        knowledge base. Try selecting additional symptoms or consult an agronomist.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row justify-center">
        <Button onClick={onGoBack} variant="secondary">← Add More Symptoms</Button>
        <Button onClick={onReset} variant="ghost">Start Over</Button>
      </div>
    </Card>
  );
}

/**
 * ResultDisplay — Step 3 of the diagnosis wizard.
 * Shows the identified disease/pest, confidence, matched symptoms,
 * and the full prevention guide.
 */
export default function ResultDisplay() {
  const { state, actions } = useDiagnosis();
  const { diagnosisResult, selectedCrop, activeSymptoms } = state;

  if (!diagnosisResult) return null;
  if (!diagnosisResult.disease) {
    return <NoMatchResult onGoBack={actions.goBack} onReset={actions.reset} />;
  }

  const { disease, severity, treatment, confidence, matched = [], description } = diagnosisResult;
  const timestamp = formatTimestamp(new Date());

  // Resolve full labels for matched symptoms
  const cropSymptoms = DIAGNOSIS_RULES[selectedCrop]?.symptoms ?? [];
  const matchedLabels = (matched ?? []).map(
    (id) => cropSymptoms.find((s) => s.id === id)?.label ?? id
  );

  return (
    <section aria-labelledby="result-heading" className="w-full max-w-4xl mx-auto space-y-5">
      <div className="flex items-start justify-between gap-3">
        <h2 id="result-heading" className="text-2xl font-extrabold text-gray-800">
          Diagnosis Result
        </h2>
        <time className="text-xs text-gray-400 mt-1 shrink-0">{timestamp}</time>
      </div>

      {/* Main result card */}
      <Card className="border-l-4 border-l-green-500">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-gray-900 leading-snug">{disease}</h3>
          <Badge severity={severity} label={`${severity} Severity`} />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {buildDiagnosisSummary(selectedCrop, disease, severity)}
        </p>

        {description && (
          <p className="text-sm text-gray-500 italic border-l-2 border-green-200 pl-3 mb-4">
            {description}
          </p>
        )}

        <ConfidenceMeter confidence={confidence} />

        {/* Matched symptoms */}
        {matchedLabels.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Symptoms that triggered this diagnosis
            </p>
            <ul className="flex flex-wrap gap-2">
              {matchedLabels.map((label) => (
                <li
                  key={label}
                  className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-medium text-green-800"
                >
                  ✓ {label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Prevention & Treatment Guide */}
      <PreventionGuide treatmentKey={treatment} />

      {/* Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row-reverse pt-2">
        <Button onClick={actions.reset} fullWidth size="lg">
          🔄&nbsp; New Diagnosis
        </Button>
        <Button onClick={actions.goBack} variant="secondary" fullWidth size="lg">
          ← Adjust Symptoms
        </Button>
      </div>
    </section>
  );
}
