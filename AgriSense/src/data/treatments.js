/**
 * Treatment & Prevention Database
 * Keyed by the `treatment` field in symptomMap.js rules.
 * Each entry contains immediate actions, chemical/organic options,
 * and long-term prevention strategies.
 */

export const TREATMENTS = {
  /* ─── MAIZE ─────────────────────────────────────────────────── */
  'apply-fall-armyworm': {
    immediateActions: [
      'Scout fields early morning and late afternoon for egg masses and larvae.',
      'Handpick and destroy egg masses and young larvae where infestation is low.',
      'Apply targeted pesticide to the whorl of individual plants.',
    ],
    chemical: [
      'Emamectin benzoate (e.g., Emacot 19EC) – apply at 0.2 L/ha.',
      'Chlorpyrifos + Cypermethrin – use with care due to environmental impact.',
      'Spinosad (organic-approved) – effective against young larvae.',
    ],
    organic: [
      'Apply Bacillus thuringiensis (Bt) into the plant whorl.',
      'Use neem-based formulations (Azadirachtin) at first detection.',
      'Encourage natural enemies such as Telenomus remus (parasitoid wasp).',
    ],
    prevention: [
      'Plant early to avoid peak moth flight periods.',
      'Use push-pull technology with Desmodium (intercrop) and Napier grass borders.',
      'Rotate crops each season to break the pest cycle.',
      'Use certified FAW-resistant maize varieties where available.',
    ],
  },

  'apply-msv': {
    immediateActions: [
      'Roguing: immediately remove and destroy all infected plants.',
      'Control leafhoppers (vector) with insecticide to prevent spread.',
      'Do not carry infected plant material to other fields.',
    ],
    chemical: [
      'Imidacloprid seed dressing to control leafhopper vectors at establishment.',
      'Thiamethoxam foliar spray for vector control post-emergence.',
    ],
    organic: [
      'Use reflective mulches to repel leafhoppers.',
      'Apply neem oil as a repellent for the Cicadulina leafhopper vector.',
    ],
    prevention: [
      'Plant MSV-tolerant/resistant varieties (e.g., CIMMYT-released lines).',
      'Avoid planting near old maize crops that may harbour vectors.',
      'Plant at the start of the rainy season to minimize vector pressure.',
      'Control weeds, which can act as alternative leafhopper hosts.',
    ],
  },

  'apply-nlb': {
    immediateActions: [
      'Remove and destroy severely infected lower leaves.',
      'Avoid overhead irrigation to reduce leaf wetness periods.',
      'Apply foliar fungicide at first signs of lesions.',
    ],
    chemical: [
      'Mancozeb (Dithane M-45) at 2 kg/ha every 10–14 days.',
      'Propiconazole (Tilt 250EC) at 0.5 L/ha for moderate to severe infection.',
    ],
    organic: [
      'Spray with Trichoderma harzianum biocontrol formulations.',
      'Copper-based fungicides (Copper hydroxide) as a protective measure.',
    ],
    prevention: [
      'Plant resistant hybrids (look for NLB tolerance ratings).',
      'Practice crop rotation with non-grass crops for at least one season.',
      'Avoid dense planting to improve airflow.',
      'Bury or compost crop residue after harvest.',
    ],
  },

  'apply-rust': {
    immediateActions: [
      'Monitor fields weekly during the growing season.',
      'Apply fungicide at first sign of pustule formation.',
    ],
    chemical: [
      'Propiconazole (Tilt 250EC) at 0.5 L/ha.',
      'Azoxystrobin (Amistar) provides both curative and protective action.',
    ],
    organic: [
      'Sulfur-based dust or wettable sulfur spray as a preventative.',
    ],
    prevention: [
      'Use rust-resistant maize hybrids.',
      'Avoid successive maize on the same plot.',
      'Plant during drier periods when possible.',
    ],
  },

  'apply-stalk-rot': {
    immediateActions: [
      'Harvest early if stalk rot is detected near maturity.',
      'Do not leave infected stover in the field.',
      'Avoid mechanical damage to stems during field operations.',
    ],
    chemical: [
      'Metalaxyl + Mancozeb seed treatment to reduce soil-borne infection.',
      'Fludioxonil seed dressing reduces Fusarium infection at germination.',
    ],
    organic: [
      'Apply Trichoderma viride as a biological seed treatment.',
    ],
    prevention: [
      'Maintain balanced soil fertility, especially potassium — K deficiency increases susceptibility.',
      'Avoid waterlogged conditions; improve field drainage.',
      'Rotate with legumes to reduce soilborne pathogen levels.',
      'Use stalk-rot-resistant hybrid varieties.',
    ],
  },

  /* ─── TOMATO ─────────────────────────────────────────────────── */
  'apply-late-blight': {
    immediateActions: [
      'Remove and destroy all infected plant tissue immediately — do not compost.',
      'Apply fungicide immediately; the disease spreads very rapidly in wet conditions.',
      'Clear neighbouring infected crops or volunteers.',
    ],
    chemical: [
      'Metalaxyl + Mancozeb (Ridomil Gold MZ) at 2.5 kg/ha every 7 days.',
      'Cymoxanil + Mancozeb (Curzate) as an alternative.',
      'Fluazinam (Shirlan) at 0.4 L/ha for resistant strains.',
    ],
    organic: [
      'Copper hydroxide (Kocide 2000) at 1.5–2 kg/ha every 5–7 days.',
      'Remove and bag infected debris before disposal.',
    ],
    prevention: [
      'Plant resistant varieties (e.g., Mountain Merit, Defiant).',
      'Avoid overhead irrigation; use drip irrigation.',
      'Stake and prune plants to improve air circulation.',
      'Avoid planting in fields with a history of late blight.',
    ],
  },

  'apply-early-blight': {
    immediateActions: [
      'Remove and destroy lower infected leaves.',
      'Apply fungicide protective spray during humid, warm weather.',
    ],
    chemical: [
      'Chlorothalonil (Bravo 500SC) at 1.5 L/ha every 7–10 days.',
      'Mancozeb + Cymoxanil for combined protection.',
    ],
    organic: [
      'Bacillus subtilis (Serenade) biofungicide.',
      'Compost tea foliar spray to boost plant immunity.',
    ],
    prevention: [
      'Mulch plants to prevent soil splash spreading spores.',
      'Practice 2–3 year crop rotation with non-solanaceous crops.',
      'Use disease-free transplants and treated seed.',
    ],
  },

  'apply-powdery-mildew': {
    immediateActions: [
      'Remove heavily infected leaves and dispose of safely.',
      'Improve ventilation around plants.',
    ],
    chemical: [
      'Trifloxystrobin + Tebuconazole (Nativo) at 0.4 L/ha.',
      'Myclobutanil (Rally) at first sign of infection.',
    ],
    organic: [
      'Spray with dilute potassium bicarbonate solution (1 tbsp/gallon water).',
      'Neem oil (1–2%) spray every 7 days.',
      'Diluted milk spray (1:9 ratio) shown to reduce severity.',
    ],
    prevention: [
      'Ensure wide plant spacing for good air circulation.',
      'Avoid excess nitrogen fertilisation.',
      'Select mildew-resistant tomato varieties.',
    ],
  },

  'apply-tomv': {
    immediateActions: [
      'Remove and destroy all infected plants immediately.',
      'Wash hands and tools with soap after handling infected plants.',
      'Control aphid and thrip vectors with appropriate insecticides.',
    ],
    chemical: [
      'Imidacloprid or Acetamiprid for vector (aphid/thrip) control.',
      'No curative chemical exists for the virus itself.',
    ],
    organic: [
      'Reflective mulch repels thrips and aphids.',
      'Insecticidal soap or neem oil to manage vector insects.',
    ],
    prevention: [
      'Use virus-indexed and certified transplants.',
      'Plant TMV / ToMV-resistant varieties.',
      'Disinfect tools, stakes, and greenhouse structures regularly.',
      'Maintain strict hygiene and avoid smoking near plants (tobacco mosaic virus risk).',
    ],
  },

  'apply-fusarium': {
    immediateActions: [
      'Remove and destroy wilting plants; do not compost.',
      'Avoid working in wet soil to limit spread.',
    ],
    chemical: [
      'Metalaxyl seed treatment reduces early infection.',
      'Propiconazole soil drench as a preventive measure near planting.',
    ],
    organic: [
      'Trichoderma harzianum soil amendment before planting.',
      'Mycorrhizal inoculants to enhance root defence.',
    ],
    prevention: [
      'Use Fusarium-resistant tomato varieties (look for "FFT" resistance).',
      'Rotate with non-solanaceous crops for 3–4 years.',
      'Solarize soil in raised beds before transplanting.',
      'Maintain soil pH at 6.5–7.0 to suppress soilborne fungi.',
    ],
  },

  'apply-whitefly': {
    immediateActions: [
      'Use yellow sticky traps to monitor and reduce adult populations.',
      'Apply insecticide to the undersides of leaves where nymphs feed.',
    ],
    chemical: [
      'Spiromesifen (Oberon) at 0.5 L/ha – effective against nymphs.',
      'Pyriproxyfen (Knack) for juvenile growth regulation.',
      'Avoid overuse of pyrethroids, which can cause resistance.',
    ],
    organic: [
      'Neem oil (Azadirachtin) spray every 5 days.',
      'Insecticidal soap (potassium salts of fatty acids).',
      'Introduce natural predator Encarsia formosa in protected cultivation.',
    ],
    prevention: [
      'Use insect-proof mesh in greenhouses.',
      'Remove and destroy crop residues immediately after harvest.',
      'Avoid planting near older tomato / cucumber crops.',
      'Reflective mulch deters whitefly from landing on plants.',
    ],
  },

  /* ─── CASSAVA ─────────────────────────────────────────────────── */
  'apply-cmd': {
    immediateActions: [
      'Rogue out all visibly infected plants and burn or bury them.',
      'Do not use cuttings from infected plants for propagation.',
      'Control whitefly vectors (Bemisia tabaci) immediately.',
    ],
    chemical: [
      'Imidacloprid dip of cuttings before planting (vector suppression only).',
      'No curative chemical for the virus — focus is vector management.',
    ],
    organic: [
      'Neem-based spray on whitefly colonies.',
      'Introduce parasitic wasps (Encarsia lutea) for biological control.',
    ],
    prevention: [
      'Plant CMD-resistant or CMD-tolerant varieties (e.g., IITA-TME series).',
      'Source certified, virus-free planting material.',
      'Rogue infected plants early and continuously.',
      'Avoid early planting in areas with very high whitefly pressure.',
    ],
  },

  'apply-cbsd': {
    immediateActions: [
      'Immediately destroy infected plants and all associated roots.',
      'Do not replant cassava in the same plot without a break crop.',
      'Test planting material with diagnostic kits if available.',
    ],
    chemical: [
      'Vector management with thiamethoxam or imidacloprid to control whiteflies.',
    ],
    organic: [
      'Neem extracts to reduce whitefly populations.',
    ],
    prevention: [
      'Only use certified CBSD-free planting material.',
      'Plant CBSD-tolerant varieties (consult local extension service for approved varieties).',
      'Maintain strict field sanitation.',
      'Avoid moving planting material from CBSD-endemic regions.',
    ],
  },

  'apply-cbb': {
    immediateActions: [
      'Cut off and destroy infected branches well below the cankered tissue.',
      'Disinfect all cutting tools with 10% bleach or 70% alcohol between plants.',
      'Avoid injuring plants during weeding.',
    ],
    chemical: [
      'Copper oxychloride spray on cut surfaces and surrounding foliage.',
      'Streptomycin foliar spray in severe outbreaks (check local regulations).',
    ],
    organic: [
      'Copper-based bactericides as protective sprays.',
      'Wood ash paste applied to pruning wounds.',
    ],
    prevention: [
      'Use disease-free planting material from healthy stem cuttings.',
      'Avoid planting during dry, windy periods when bacterial spread is high.',
      'Practice crop rotation and field hygiene.',
      'Do not intercrop with host weeds known to harbour the bacterium.',
    ],
  },

  'apply-mite': {
    immediateActions: [
      'Spray the undersides of leaves thoroughly with miticide.',
      'Remove heavily infested leaves and destroy.',
    ],
    chemical: [
      'Abamectin (Dynamec) at 0.5 L/ha — highly effective against spider mites.',
      'Bifenazate (Floramite) for populations showing resistance to other products.',
    ],
    organic: [
      'Neem oil (2%) with surfactant — spray every 5–7 days.',
      'Introduce predatory mite Phytoseiulus persimilis in high-value fields.',
      'Sulphur dust or wettable sulfur as a miticide.',
    ],
    prevention: [
      'Maintain crop vigour through adequate irrigation — drought stress worsens mite outbreaks.',
      'Avoid broad-spectrum pesticides that destroy natural predators.',
      'Monitor field edges first as infestations typically start there.',
    ],
  },

  'apply-mealybug': {
    immediateActions: [
      'Physically remove mealybug colonies with a brush dipped in insecticidal soap.',
      'Spray with systemic insecticide targeting crawlers (young nymphs).',
    ],
    chemical: [
      'Chlorpyrifos + Cypermethrin at 1 L/ha targeting crawler stage.',
      'Thiamethoxam systemic insecticide for persistent infestations.',
    ],
    organic: [
      'Introduce Anagyrus lopezi (parasitoid wasp) for biological control.',
      'Neem-based formulations (Azadirachtin) every 7 days.',
      'Insecticidal soap spray directly on colonies.',
    ],
    prevention: [
      'Quarantine new planting material to prevent introduction.',
      'Avoid monoculture; intercropping can reduce mealybug spread.',
      'Encourage natural enemies by limiting broad-spectrum insecticide use.',
      'Inspect planting material from nurseries carefully before field introduction.',
    ],
  },
};
