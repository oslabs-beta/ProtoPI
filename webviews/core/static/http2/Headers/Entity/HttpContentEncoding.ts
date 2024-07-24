// Define a constant array of common content encoding values with detailed comments
const VALID_CONTENT_ENCODING = [
  "gzip",  // Uses Lempel-Ziv coding (LZ77), with a 32-bit CRC; specified in RFC 1952
  "deflate",  // Uses zlib structure, defined in RFC 1951
  "br",  // Brotli encoding, specified in RFC 7932
  "compress",  // Legacy compression method using LZW algorithm; defined in RFC 7230
  "identity"  // No transformation whatsoever, specified in RFC 7231
] as const;

// Create a type from the array using typeof and indexed access
type ContentEncoding = typeof VALID_CONTENT_ENCODING[number];

// Export the original array of valid content encodings
export const validContentEncodings: ContentEncoding[] = [...VALID_CONTENT_ENCODING];
