// @ts-nocheck

// Define a constant array of common via header entries
const VALID_VIA_ENTRIES = [
  "1.1 vegur",  // Indicates that an intermediate proxy or gateway named "vegur" using HTTP/1.1 was a part of the request/response chain.
  "2.0 example",  // Example entry for HTTP/2.0 via an example proxy.
] as const;

// Create a type from the array using typeof and indexed access
type ViaEntry = typeof VALID_VIA_ENTRIES[number];

// Export the original array of valid via entries
export const validViaEntries: ViaEntry[] = [...VALID_VIA_ENTRIES];
