/**
 * AgriSense Knowledge Base
 * Symptom map and forward-chaining rule set for Maize, Tomato, and Cassava.
 * Each crop entry contains:
 *   - symptoms : UI list of observable symptoms
 *   - rules    : Forward-chaining IF-THEN rules consumed by the inference engine
 */

export const CROPS = [
  { id: 'Maize',   label: 'Maize',   icon: '🌽', color: 'bg-yellow-50 border-yellow-400 text-yellow-800' },
  { id: 'Tomato',  label: 'Tomato',  icon: '🍅', color: 'bg-red-50   border-red-400   text-red-800'    },
  { id: 'Cassava', label: 'Cassava', icon: '🌿', color: 'bg-green-50 border-green-400 text-green-800'  },
];

export const SYMPTOM_MAP = {
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
        disease:        'Fall Armyworm (Spodoptera frugiperda)',
        matchSymptoms:  ['maize_holes', 'maize_frass', 'maize_stunted'],
        minMatch:       2,
        severity:       'High',
        treatment:      'apply-fall-armyworm',
      },
      {
        disease:        'Maize Streak Virus (MSV)',
        matchSymptoms:  ['maize_yellowing', 'maize_streaks', 'maize_stunted'],
        minMatch:       2,
        severity:       'High',
        treatment:      'apply-msv',
      },
      {
        disease:        'Northern Leaf Blight (Turcicum Blight)',
        matchSymptoms:  ['maize_lesions', 'maize_spots', 'maize_yellowing'],
        minMatch:       2,
        severity:       'Medium',
        treatment:      'apply-nlb',
      },
      {
        disease:        'Common Rust (Puccinia sorghi)',
        matchSymptoms:  ['maize_rust', 'maize_yellowing'],
        minMatch:       2,
        severity:       'Medium',
        treatment:      'apply-rust',
      },
      {
        disease:        'Stalk Rot (Gibberella / Fusarium)',
        matchSymptoms:  ['maize_wilting', 'maize_ear_damage', 'maize_stunted'],
        minMatch:       2,
        severity:       'High',
        treatment:      'apply-stalk-rot',
      },
    ],
  },

  Tomato: {
    symptoms: [
      { id: 'tomato_dark_spots',   label: 'Dark spots on leaves'                    },
      { id: 'tomato_blight',       label: 'Water-soaked lesions on leaves'          },
      { id: 'tomato_yellowing',    label: 'Yellowing (chlorosis) of leaves'         },
      { id: 'tomato_wilting',      label: 'Sudden wilting of plants'                },
      { id: 'tomato_curling',      label: 'Leaf curling or rolling'                 },
      { id: 'tomato_fruit_rot',    label: 'Brown / black rot on fruits'             },
      { id: 'tomato_white_mold',   label: 'White powdery mold on leaves'            },
      { id: 'tomato_mosaic',       label: 'Mosaic / mottled discoloration'          },
      { id: 'tomato_insects',      label: 'Visible insects on leaf undersides'      },
      { id: 'tomato_stem_dark',    label: 'Dark discoloration at stem base'         },
    ],
    rules: [
      {
        disease:       'Late Blight (Phytophthora infestans)',
        matchSymptoms: ['tomato_blight', 'tomato_wilting', 'tomato_fruit_rot'],
        minMatch:      2,
        severity:      'Critical',
        treatment:     'apply-late-blight',
      },
      {
        disease:       'Early Blight (Alternaria solani)',
        matchSymptoms: ['tomato_dark_spots', 'tomato_yellowing'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-early-blight',
      },
      {
        disease:       'Powdery Mildew (Leveillula taurica)',
        matchSymptoms: ['tomato_white_mold', 'tomato_yellowing', 'tomato_curling'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-powdery-mildew',
      },
      {
        disease:       'Tomato Mosaic Virus (ToMV)',
        matchSymptoms: ['tomato_mosaic', 'tomato_curling', 'tomato_yellowing'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-tomv',
      },
      {
        disease:       'Fusarium Wilt (Fusarium oxysporum)',
        matchSymptoms: ['tomato_wilting', 'tomato_stem_dark', 'tomato_yellowing'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-fusarium',
      },
      {
        disease:       'Whitefly Infestation (Bemisia tabaci)',
        matchSymptoms: ['tomato_insects', 'tomato_yellowing', 'tomato_curling'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-whitefly',
      },
    ],
  },

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
      },
      {
        disease:       'Cassava Brown Streak Disease (CBSD)',
        matchSymptoms: ['cassava_brown_spots', 'cassava_root_rot', 'cassava_yellowing'],
        minMatch:      2,
        severity:      'Critical',
        treatment:     'apply-cbsd',
      },
      {
        disease:       'Cassava Bacterial Blight (CBB)',
        matchSymptoms: ['cassava_wilting', 'cassava_stem_lesion', 'cassava_brown_spots'],
        minMatch:      2,
        severity:      'High',
        treatment:     'apply-cbb',
      },
      {
        disease:       'Red Spider Mite (Mononychellus tanajoa)',
        matchSymptoms: ['cassava_mites', 'cassava_yellowing', 'cassava_distortion'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-mite',
      },
      {
        disease:       'Mealybug Infestation (Phenacoccus manihoti)',
        matchSymptoms: ['cassava_mealy', 'cassava_stunted', 'cassava_yellowing'],
        minMatch:      2,
        severity:      'Medium',
        treatment:     'apply-mealybug',
      },
    ],
  },
};
