/**
 * mockData.js — AgriSense Mock Service
 *
 * Single source of truth for UI development and Vercel deployments
 * where the Flask / FastAPI inference backend is not yet available.
 *
 * Exports:
 *   CROPS          — crop selector cards (icon, label, accent colours)
 *   DIAGNOSIS_RULES — per-crop symptoms + forward-chaining rules
 */

/* ── Crop card definitions ──────────────────────────────────────── */
export const CROPS = [
  { id: 'Maize',   label: 'Maize',   icon: '🌽', color: 'bg-yellow-50 border-yellow-400 text-yellow-800' },
  { id: 'Tomato',  label: 'Tomato',  icon: '🍅', color: 'bg-red-50   border-red-400   text-red-800'    },
  { id: 'Cassava', label: 'Cassava', icon: '🌿', color: 'bg-green-50 border-green-400 text-green-800'  },
];

/* ── Diagnosis rules ────────────────────────────────────────────── */
/**
 * Structure per crop:
 *   symptoms : array of { id, label } — rendered in the UI checklist
 *   rules    : forward-chaining IF-THEN rules consumed by runMockDiagnosis()
 *              Each rule fires when ≥ minMatch of its matchSymptoms are selected.
 *              The rule with the most matches wins (greedy best-match).
 */
export const DIAGNOSIS_RULES = {
  /* ══════════════════════════════════════════════════════════════
     MAIZE
  ══════════════════════════════════════════════════════════════ */
  Maize: {
    symptoms: [
      { id: 'maize_yellowing',  label: 'Yellowing of leaves'              },
      { id: 'maize_stunted',    label: 'Stunted / slow growth'            },
      { id: 'maize_spots',      label: 'Brown or gray spots on leaves'    },
      { id: 'maize_lesions',    label: 'Elongated lesions on leaves'      },
      { id: 'maize_rust',       label: 'Rust-colored pustules on leaves'  },
      { id: 'maize_streaks',    label: 'Pale streaks along leaf veins'    },
      { id: 'maize_ear_damage', label: 'Damaged ears / kernel rot'        },
      { id: 'maize_wilting',    label: 'Wilting during the day'           },
      { id: 'maize_frass',      label: 'Frass (insect droppings) present' },
      { id: 'maize_holes',      label: 'Holes in leaves or stem'          },
    ],
    rules: [
      {
        disease:       'Fall Armyworm (Spodoptera frugiperda)',
        matchSymptoms: ['maize_holes', 'maize_frass', 'maize_stunted'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-fall-armyworm',
        description:   'A highly destructive moth larva that feeds inside the maize whorl, creating characteristic "window-pane" damage and leaving frass.',
      },
      {
        disease:       'Maize Streak Virus (MSV)',
        matchSymptoms: ['maize_yellowing', 'maize_streaks', 'maize_stunted'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-msv',
        description:   'A leafhopper-transmitted virus causing pale streaking along veins, stunting, and severe yield loss if infection occurs early.',
      },
      {
        disease:       'Northern Leaf Blight (Turcicum Blight)',
        matchSymptoms: ['maize_lesions', 'maize_spots', 'maize_yellowing'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-nlb',
        description:   'A fungal disease (Exserohilum turcicum) producing large, elongated gray-green to tan lesions on leaves under humid conditions.',
      },
      {
        disease:       'Common Rust (Puccinia sorghi)',
        matchSymptoms: ['maize_rust', 'maize_yellowing'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-rust',
        description:   'A fungal disease producing circular to elongated cinnamon-brown pustules on both leaf surfaces during cool, moist weather.',
      },
      {
        disease:       'Stalk Rot (Gibberella / Fusarium)',
        matchSymptoms: ['maize_wilting', 'maize_ear_damage', 'maize_stunted'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-stalk-rot',
        description:   'Soilborne fungi that colonise roots and lower stalks, causing premature death, lodging, and severe kernel rot near harvest.',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
     TOMATO
  ══════════════════════════════════════════════════════════════ */
  Tomato: {
    symptoms: [
      { id: 'tomato_dark_spots',  label: 'Dark spots on leaves'               },
      { id: 'tomato_blight',      label: 'Water-soaked lesions on leaves'     },
      { id: 'tomato_yellowing',   label: 'Yellowing (chlorosis) of leaves'    },
      { id: 'tomato_wilting',     label: 'Sudden wilting of plants'           },
      { id: 'tomato_curling',     label: 'Leaf curling or rolling'            },
      { id: 'tomato_fruit_rot',   label: 'Brown / black rot on fruits'        },
      { id: 'tomato_white_mold',  label: 'White powdery mold on leaves'       },
      { id: 'tomato_mosaic',      label: 'Mosaic / mottled discoloration'     },
      { id: 'tomato_insects',     label: 'Visible insects on leaf undersides' },
      { id: 'tomato_stem_dark',   label: 'Dark discoloration at stem base'    },
    ],
    rules: [
      {
        disease:       'Late Blight (Phytophthora infestans)',
        matchSymptoms: ['tomato_blight', 'tomato_wilting', 'tomato_fruit_rot'],
        minMatch:      2,
        severity:      'Critical',
        treatment:     'apply-late-blight',
        description:   'The most destructive tomato disease — a water mould that spreads explosively in cool, wet weather, destroying entire fields within days.',
      },
      {
        disease:       'Early Blight (Alternaria solani)',
        matchSymptoms: ['tomato_dark_spots', 'tomato_yellowing'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-early-blight',
        description:   'A fungal disease causing dark, target-like lesions with concentric rings, typically starting on older lower leaves.',
      },
      {
        disease:       'Powdery Mildew (Leveillula taurica)',
        matchSymptoms: ['tomato_white_mold', 'tomato_yellowing', 'tomato_curling'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-powdery-mildew',
        description:   'A fungal disease forming white powdery patches on leaf surfaces, thriving in warm days with cool nights and low humidity.',
      },
      {
        disease:       'Tomato Mosaic Virus (ToMV)',
        matchSymptoms: ['tomato_mosaic', 'tomato_curling', 'tomato_yellowing'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-tomv',
        description:   'A highly stable, mechanically transmitted virus causing mosaic patterns, distortion, and yield reduction. No chemical cure exists.',
      },
      {
        disease:       'Fusarium Wilt (Fusarium oxysporum)',
        matchSymptoms: ['tomato_wilting', 'tomato_stem_dark', 'tomato_yellowing'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-fusarium',
        description:   'A soilborne fungus that invades vascular tissue, causing one-sided yellowing, wilting, and dark discoloration inside the stem.',
      },
      {
        disease:       'Whitefly Infestation (Bemisia tabaci)',
        matchSymptoms: ['tomato_insects', 'tomato_yellowing', 'tomato_curling'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-whitefly',
        description:   'Tiny sap-sucking insects on leaf undersides that cause chlorosis, curling, and transmit Tomato Yellow Leaf Curl Virus (TYLCV).',
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════════
     CASSAVA
  ══════════════════════════════════════════════════════════════ */
  Cassava: {
    symptoms: [
      { id: 'cassava_mosaic',      label: 'Mosaic / mottled leaves'               },
      { id: 'cassava_yellowing',   label: 'Yellowing of leaves'                   },
      { id: 'cassava_stunted',     label: 'Stunted growth'                        },
      { id: 'cassava_brown_spots', label: 'Brown angular spots on leaves'         },
      { id: 'cassava_wilting',     label: 'Wilting shoots'                        },
      { id: 'cassava_root_rot',    label: 'Root discoloration or rot'             },
      { id: 'cassava_mites',       label: 'Tiny mites on leaf undersides'         },
      { id: 'cassava_distortion',  label: 'Leaf distortion / curling'             },
      { id: 'cassava_stem_lesion', label: 'Stem canker / lesions'                 },
      { id: 'cassava_mealy',       label: 'White mealy residue on leaves / stems' },
    ],
    rules: [
      {
        disease:       'Cassava Mosaic Disease (CMD)',
        matchSymptoms: ['cassava_mosaic', 'cassava_stunted', 'cassava_yellowing'],
        minMatch:      2,
        severity:      'Critical',
        treatment:     'apply-cmd',
        description:   'The most economically important cassava disease in Africa — a begomovirus complex spread by the whitefly Bemisia tabaci causing mosaic patterns and severe stunting.',
      },
      {
        disease:       'Cassava Brown Streak Disease (CBSD)',
        matchSymptoms: ['cassava_brown_spots', 'cassava_root_rot', 'cassava_yellowing'],
        minMatch:      2,
        severity:      'Critical',
        treatment:     'apply-cbsd',
        description:   'A viral disease causing feathery chlorosis on leaves and necrotic brown streaks in storage roots, making them unfit for consumption.',
      },
      {
        disease:       'Cassava Bacterial Blight (CBB)',
        matchSymptoms: ['cassava_wilting', 'cassava_stem_lesion', 'cassava_brown_spots'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-cbb',
        description:   'Caused by Xanthomonas phaseoli pv. manihotis, producing angular leaf spots, wilting, stem cankers, and milky ooze during humid conditions.',
      },
      {
        disease:       'Red Spider Mite (Mononychellus tanajoa)',
        matchSymptoms: ['cassava_mites', 'cassava_yellowing', 'cassava_distortion'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-mite',
        description:   'Microscopic mites that feed on leaf undersides, causing stippling, yellowing, and distortion — outbreaks are worst during hot, dry spells.',
      },
      {
        disease:       'Mealybug Infestation (Phenacoccus manihoti)',
        matchSymptoms: ['cassava_mealy', 'cassava_stunted', 'cassava_yellowing'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-mealybug',
        description:   'Sap-sucking insects covered in white waxy powder that cluster on growing tips, causing "bunchy top" stunting and significant yield losses.',
      },
    ],
  },
};
