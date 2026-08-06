export interface DeviceModesInfo {
  modes: string[];
  note?: string;
}

/**
 * Returns available ventilation / operating modes based on the device name or ID.
 * Exactly matches Löwenstein Medical product specifications:
 * - prisma SMART Plus: CPAP, APAP (Standard / Dynamic algorithm available in APAP)
 * - prisma 25ST: CPAP, APAP, S, AutoS, ST, AutoST, T
 * - prisma 30ST: CPAP, APAP, S, ST, AutoST, T, aPCV
 * - prisma VENT 40: CPAP, S, ST, AutoST, T, PSV, aPCV, PCV
 * - LUISA: CPAP, S, ST, AutoST, T, PSV, aPCV, PCV, aVCV, VCV, P-SIMV, V-SIMV, MPVp, MPVv
 */
export function getProductModes(productNameOrId?: string): DeviceModesInfo | null {
  if (!productNameOrId) return null;
  const norm = productNameOrId.toLowerCase().trim();

  // LUISA
  if (norm.includes("luisa")) {
    return {
      modes: ["CPAP", "S", "ST", "AutoST", "T", "PSV", "aPCV", "PCV", "aVCV", "VCV", "P-SIMV", "V-SIMV", "MPVp", "MPVv"],
    };
  }

  // prisma VENT family
  if (norm.includes("vent 50")) {
    return {
      modes: ["CPAP", "S", "ST", "AutoST", "T", "PSV", "aPCV", "PCV", "aVCV", "VCV"],
    };
  }
  if (norm.includes("vent 40") || norm.includes("prisma vent 40")) {
    return {
      modes: ["CPAP", "S", "ST", "AutoST", "T", "PSV", "aPCV", "PCV"],
    };
  }
  if (norm.includes("vent 30") || norm.includes("prisma vent 30")) {
    return {
      modes: ["CPAP", "S", "ST", "AutoST", "T", "aPCV"],
    };
  }

  // prisma 30ST
  if (norm.includes("30st") || norm.includes("prisma 30st")) {
    return {
      modes: ["CPAP", "APAP", "S", "ST", "AutoST", "T", "aPCV"],
    };
  }

  // prisma 25ST
  if (norm.includes("25st") || norm.includes("prisma 25st")) {
    return {
      modes: ["CPAP", "APAP", "S", "AutoS", "ST", "AutoST", "T"],
    };
  }

  // prisma SMART Plus / prisma SMART / 20A
  if (norm.includes("smart") || norm.includes("20a") || norm.includes("soft")) {
    return {
      modes: ["CPAP", "APAP"],
      note: "Standard / Dynamic algorithm available in APAP",
    };
  }

  return null;
}
