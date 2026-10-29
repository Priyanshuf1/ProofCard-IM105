/**
 * Pariksha Public URL & Verification Routing Helper
 * Guarantees that public verification links, QR codes, and viva invitations
 * ALWAYS resolve to the live production host (https://proofcard.vercel.app)
 * whenever running locally or on non-production hosts, so any external
 * phone, tablet, or browser can scan and view the verified credential immediately.
 */

import { CandidateProfile } from '../types';

export function getPublicBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'https://proofcard.vercel.app';
  }

  const hostname = window.location.hostname;

  // If local host or LAN IP or internal domain, always use canonical production URL
  if (
    !hostname ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('172.') ||
    !hostname.includes('.')
  ) {
    return 'https://proofcard.vercel.app';
  }

  // If running on stale proofcard-im105 deployment, normalize to canonical production URL
  if (hostname === 'proofcard-im105.vercel.app') {
    return 'https://proofcard.vercel.app';
  }

  return window.location.origin;
}

export function buildPublicVerifyUrl(candidate: CandidateProfile): string {
  const base = getPublicBaseUrl();
  const card = candidate.proof_card;
  const status = card?.status || (
    candidate.is_prompt_injected || candidate.has_prompt_injection 
      ? 'FLAGGED_ADVERSARIAL_INJECTION' 
      : (candidate.is_clone ? 'FLAGGED_CLONE' : ((candidate.authenticity_score || 0) >= 80 ? 'VERIFIED_EXEMPLARY' : 'VERIFIED_SOLID'))
  );

  const params = new URLSearchParams({
    verify: candidate.candidate_id,
    name: candidate.name || 'Verified Candidate',
    auth: String(candidate.authenticity_score ?? 0),
    viva: String(candidate.viva_score ?? 0),
    status: status,
    college: candidate.college || '',
    tier: candidate.college_tier || '',
    project: candidate.project_name || candidate.project_type || '',
    track: candidate.project_type || 'Full Stack Engineer'
  });

  return `${base}/?${params.toString()}`;
}

export function buildPublicVivaUrl(candidateId: string): string {
  const base = getPublicBaseUrl();
  return `${base}/?cid=${encodeURIComponent(candidateId)}`;
}
