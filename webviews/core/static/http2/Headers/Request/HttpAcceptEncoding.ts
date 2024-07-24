// @ts-nocheck

// Define a constant array of common content encoding values
const VALID_ACCEPT_ENCODING = [
  "gzip",
  "deflate",
  "br",  // Brotli compression
  "identity",  // No compression
  "*"  // Any encoding
] as const;

// Create a type from the array using typeof and indexed access
type AcceptEncoding = typeof VALID_ACCEPT_ENCODING[number];

// Export the original array of valid accept encoding values
export const validAcceptEncodings: AcceptEncoding[] = [...VALID_ACCEPT_ENCODING];
