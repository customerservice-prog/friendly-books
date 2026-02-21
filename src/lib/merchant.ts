export function normalizeMerchantKey(input: string): string {
  const s = (input || "").trim().toUpperCase();
  // remove punctuation
  const noPunct = s.replace(/[^A-Z0-9\s]/g, " ");
  // collapse whitespace
  return noPunct.replace(/\s+/g, " ").trim();
}
