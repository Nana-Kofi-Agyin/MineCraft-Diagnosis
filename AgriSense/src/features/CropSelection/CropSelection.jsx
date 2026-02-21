import { CROPS } from '../../data/mockData';
import { useDiagnosis } from '../../context/DiagnosisContext';

/**
 * CropCard — individual selection card for one crop.
 */
function CropCard({ crop, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(crop.id)}
      aria-pressed={isSelected}
      className={[
        'flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6',
        'w-full min-h-[140px] font-semibold text-lg transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2',
        'cursor-pointer select-none',
        isSelected
          ? `${crop.color} scale-[1.03] shadow-md`
          : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 hover:shadow-sm text-gray-700',
      ].join(' ')}
    >
      <span className="text-5xl" aria-hidden="true">{crop.icon}</span>
      <span>{crop.label}</span>
    </button>
  );
}

/**
 * CropSelection — Step 1 of the diagnosis wizard.
 * Renders a responsive 3-column grid of crop cards.
 */
export default function CropSelection() {
  const { state, actions } = useDiagnosis();

  return (
    <section aria-labelledby="crop-heading" className="w-full">
      <div className="mb-6 text-center">
        <h2 id="crop-heading" className="text-2xl font-extrabold text-gray-800">
          Which crop are you diagnosing?
        </h2>
        <p className="mt-1.5 text-gray-500">
          Select the crop showing signs of disease or pest damage.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 place-items-center sm:grid-cols-2 lg:grid-cols-3">
        {CROPS.map((crop) => (
          <CropCard
            key={crop.id}
            crop={crop}
            isSelected={state.selectedCrop === crop.id}
            onSelect={actions.selectCrop}
          />
        ))}
      </div>

      {state.selectedCrop && (
        <p className="mt-4 text-center text-sm text-green-700 font-medium animate-pulse">
          ✓ {state.selectedCrop} selected — loading symptom checklist…
        </p>
      )}
    </section>
  );
}
