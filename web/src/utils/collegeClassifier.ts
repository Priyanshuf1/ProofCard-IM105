/**
 * Pariksha IM-105: Dynamic College Tier Classifier
 * Categorizes institutions into Tier-1, Tier-2, and Tier-3 based on established
 * national accreditation (NIRF, NAAC, Institutes of National Importance) and global standards.
 */

const TIER_1_PATTERNS = [
  /\biit\b/i,
  /indian\s+institute\s+of\s+technology/i,
  /\bbits\b/i,
  /birla\s+institute\s+of\s+technology\s+and\s+science/i,
  /\bnit\b/i,
  /national\s+institute\s+of\s+technology/i,
  /\bmnnit\b/i,
  /\bvnit\b/i,
  /\bsvnit\b/i,
  /\bmanit\b/i,
  /\biiit\b/i,
  /indian\s+institute\s+of\s+information\s+technology/i,
  /international\s+institute\s+of\s+information\s+technology/i,
  /\biisc\b/i,
  /indian\s+institute\s+of\s+science/i,
  /\bisi\b/i,
  /indian\s+statistical\s+institute/i,
  /\bcmi\b/i,
  /chennai\s+mathematical\s+institute/i,
  /\bdtu\b/i,
  /delhi\s+technological\s+university/i,
  /\bnsut\b/i,
  /\bnsit\b/i,
  /netaji\s+subhas/i,
  /jadavpur\s+university/i,
  /anna\s+university/i,
  /\bcoep\b/i,
  /college\s+of\s+engineering\s+pune/i,
  /\bvjti\b/i,
  /veermata\s+jijabai/i,
  /\bmit\b(?!\s*pune)/i,
  /massachusetts\s+institute\s+of\s+technology/i,
  /\bstanford\b/i,
  /\bharvard\b/i,
  /carnegie\s+mellon/i,
  /\bcmu\b/i,
  /\bberkeley\b/i,
  /\bcambridge\b/i,
  /\boxford\b/i,
  /\bcaltech\b/i,
  /\bprinceton\b/i,
  /\beth\s+zurich\b/i,
  /imperial\s+college/i
];

const TIER_2_PATTERNS = [
  /gla\s+university/i,
  /\bgla\b/i,
  /vellore\s+institute\s+of\s+technology/i,
  /\bvit\b/i,
  /thapar/i,
  /\btiet\b/i,
  /manipal/i,
  /\bmahe\b/i,
  /srm\s+institute/i,
  /srm\s+university/i,
  /\bsrm\b/i,
  /kalinga\s+institute/i,
  /\bkiit\b/i,
  /pes\s+university/i,
  /\bpesit\b/i,
  /\bpes\b/i,
  /\brvce\b/i,
  /r\.?v\.?\s+college\s+of\s+engineering/i,
  /\bbmsce\b/i,
  /\bbms\s+college\b/i,
  /\bmsrit\b/i,
  /ramaiah\s+institute/i,
  /amity\s+university/i,
  /\bamity\b/i,
  /lovely\s+professional\s+university/i,
  /\blpu\b/i,
  /shiv\s+nadar/i,
  /ashoka\s+university/i,
  /bennett\s+university/i,
  /graphic\s+era/i,
  /jaypee\s+institute/i,
  /\bjiit\b/i,
  /\bupes\b/i,
  /chitkara/i,
  /chandigarh\s+university/i,
  /mit\s*-\s*wpu/i,
  /mit\s+pune/i,
  /symbiosis/i,
  /da-?iict/i,
  /nirma\s+university/i,
  /psg\s+college/i,
  /heritage\s+institute/i,
  /institute\s+of\s+engineering\s+and\s+management/i,
  /\biem\b/i,
  /\bhbtu\b/i,
  /\bmmmut\b/i,
  /\bakgec\b/i,
  /\bkiet\b/i,
  /\bjss\b/i,
  /galgotias/i,
  /cummin/i,
  /walchand/i,
  /delhi\s+university/i,
  /mumbai\s+university/i,
  /pune\s+university/i,
  /savitribai\s+phule/i
];

export interface CollegeTierInfo {
  tier: 'Tier-1' | 'Tier-2' | 'Tier-3';
  label: string;
  badgeColor: string;
  description: string;
}

export function classifyCollegeTier(collegeName?: string): CollegeTierInfo {
  if (!collegeName || !collegeName.trim()) {
    return {
      tier: 'Tier-3',
      label: 'Tier-3 Regional',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/40',
      description: 'State Affiliated / Regional College'
    };
  }

  const name = collegeName.trim();

  for (const pattern of TIER_1_PATTERNS) {
    if (pattern.test(name)) {
      return {
        tier: 'Tier-1',
        label: 'Tier-1 Elite',
        badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/40',
        description: 'Institute of National Importance (IIT / NIT / BITS / Premier)'
      };
    }
  }

  for (const pattern of TIER_2_PATTERNS) {
    if (pattern.test(name)) {
      return {
        tier: 'Tier-2',
        label: 'Tier-2 Accredited',
        badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
        description: 'Established University / NAAC A+ Technical Institute'
      };
    }
  }

  return {
    tier: 'Tier-3',
    label: 'Tier-3 Regional',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/40',
    description: 'State Affiliated / Regional Engineering College'
  };
}
