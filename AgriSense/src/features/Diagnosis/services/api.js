/**
 * api.js — AgriSense Diagnosis Service
 *
 * Active mode  : Mock Service (no backend required — safe for Vercel)
 * Future mode  : Set VITE_INFERENCE_API_URL in your Vercel environment
 *                variables to automatically delegate to the real backend.
 *
 * Mock logic   : Local forward-chaining over DIAGNOSIS_RULES from mockData.js.
 *                Fires the rule whose matchSymptoms overlap most with the
 *                user's selected symptoms (greedy best-match, ≥ minMatch).
 */

import { DIAGNOSIS_RULES } from '../../../data/mockData';
import { formatConfidence } from '../../../utils/formatter';

const BASE_URL = import.meta.env.VITE_INFERENCE_API_URL ?? '';

/* ─── Mock Inference Engine ─────────────────────────────────────── */
/**
 * runMockDiagnosis
 * Filters DIAGNOSIS_RULES for the selected crop and returns the
 * best-matching disease based on the user's selected symptom IDs.
 *
 * @param {string}   crop     - 'Maize' | 'Tomato' | 'Cassava'
 * @param {string[]} symptoms - array of active symptom IDs
 * @returns {{ disease, severity, treatment, confidence, matched, description } | null}
 */
function runMockDiagnosis(crop, symptoms) {
  const cropData = DIAGNOSIS_RULES[crop];
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
    disease:     bestRule.disease,
    severity:    bestRule.severity,
    treatment:   bestRule.treatment,
    description: bestRule.description ?? '',
    confidence:  formatConfidence(bestCount, bestRule.matchSymptoms.length),
    matched:     bestRule.matchedSymptoms,
  };
}

/* ─── Public API ────────────────────────────────────────────────── */
/**
 * runDiagnosis
 * Entry point called by useInferenceEngine.
 * Uses the live backend when VITE_INFERENCE_API_URL is set,
 * otherwise runs the mock inference locally.
 *
 * Always wrapped in try/catch by the caller; this function may throw
 * on network errors so the hook can surface them gracefully.
 *
 * @param {string}   crop
 * @param {string[]} symptoms
 * @returns {Promise<object>}
 */
export async function runDiagnosis(crop, symptoms) {
  /* ── Live backend path ── */
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/api/diagnose`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ crop, symptoms }),
    });
    if (!res.ok) throw new Error(`Inference engine returned status ${res.status}`);
    return res.json();
  }

  /* ── Mock Service path ── */
  // Simulate 1-second processing delay so the loading state is visible.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = runMockDiagnosis(crop, symptoms);

  if (!result) {
    // No rule matched — return a sentinel so the UI shows a graceful message.
    return {
      disease:     null,
      severity:    null,
      treatment:   null,
      description: null,
      confidence:  '0%',
      matched:     [],
    };
  }

  return result;
}
