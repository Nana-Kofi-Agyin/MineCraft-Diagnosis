/**
 * api.js — Diagnosis service layer
 * 
 * Abstracts the communication with the inference engine backend.
 * Currently uses a local forward-chaining fallback so the UI works
 * without a live server. Swap the BASE_URL and the `runInferenceEngine`
 * fetch call once your backend (Flask / FastAPI) is ready.
 *
 * Expected POST /api/diagnose request body:
 *   { crop: string, symptoms: string[] }
 *
 * Expected response:
 *   {
 *     disease:    string,
 *     severity:   'Critical' | 'High' | 'Medium' | 'Low',
 *     treatment:  string,   // key into TREATMENTS map
 *     confidence: string,   // e.g. "83%"
 *     matched:    string[], // symptom IDs that fired the rule
 *   }
 */

import { SYMPTOM_MAP } from '../../../data/symptomMap';
import { formatConfidence } from '../../../utils/formatter';

const BASE_URL = import.meta.env.VITE_INFERENCE_API_URL ?? '';

/* ─── Remote call (uncomment when backend is ready) ─────────────── */
// async function callRemoteEngine(crop, symptoms) {
//   const res = await fetch(`${BASE_URL}/api/diagnose`, {
//     method:  'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body:    JSON.stringify({ crop, symptoms }),
//   });
//   if (!res.ok) throw new Error(`Server error: ${res.status}`);
//   return res.json();
// }

/* ─── Local Forward-Chaining Fallback ───────────────────────────── */
/**
 * Runs a simple forward-chaining algorithm on the local knowledge base.
 * For each rule in the crop's rule set, count how many of its
 * matchSymptoms are present in the provided symptoms array.
 * The rule with the most matches (above minMatch threshold) wins.
 *
 * @param {string}   crop     - 'Maize' | 'Tomato' | 'Cassava'
 * @param {string[]} symptoms - array of active symptom IDs
 * @returns {{ disease, severity, treatment, confidence, matched } | null}
 */
function localForwardChain(crop, symptoms) {
  const cropData = SYMPTOM_MAP[crop];
  if (!cropData) return null;

  let bestRule  = null;
  let bestCount = 0;

  for (const rule of cropData.rules) {
    const matched = rule.matchSymptoms.filter((s) => symptoms.includes(s));
    if (matched.length >= rule.minMatch && matched.length > bestCount) {
      bestCount = matched.length;
      bestRule  = { ...rule, matchedSymptoms: matched };
    }
  }

  if (!bestRule) return null;

  return {
    disease:    bestRule.disease,
    severity:   bestRule.severity,
    treatment:  bestRule.treatment,
    confidence: formatConfidence(bestCount, bestRule.matchSymptoms.length),
    matched:    bestRule.matchedSymptoms,
  };
}

/* ─── Public API ────────────────────────────────────────────────── */
/**
 * runDiagnosis — entry point for the diagnosis service.
 * Falls back to local forward chaining when no backend URL is configured.
 *
 * @param {string}   crop
 * @param {string[]} symptoms
 * @returns {Promise<object>}
 */
export async function runDiagnosis(crop, symptoms) {
  // When a backend URL is configured, delegate to the remote engine.
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/api/diagnose`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ crop, symptoms }),
    });
    if (!res.ok) throw new Error(`Inference engine returned status ${res.status}`);
    return res.json();
  }

  // Simulate network latency for a realistic UX during development.
  await new Promise((r) => setTimeout(r, 900));

  const result = localForwardChain(crop, symptoms);

  if (!result) {
    // Return a "no match" sentinel instead of throwing,
    // so the UI can show a graceful "could not determine" message.
    return { disease: null, severity: null, treatment: null, confidence: '0%', matched: [] };
  }

  return result;
}
