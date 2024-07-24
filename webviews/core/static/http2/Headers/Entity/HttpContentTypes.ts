// @ts-nocheck

// Define a constant array of common MIME types with detailed comments
const VALID_COMMON_CONTENT_TYPE = [
  "application/json",  // Defined in RFC 8259
  "application/xml",  // Defined in RFC 7303
  "application/x-www-form-urlencoded",  // Commonly used, detailed in HTML standards
  "multipart/form-data",  // Defined in RFC 7578
  "text/html",  // Defined in RFC 2854
  "text/plain",  // Defined in RFC 2046
  "application/javascript",  // Defined in RFC 4329
  "application/pdf",  // Defined in RFC 8118
  "image/jpeg",  // Defined in RFC 2046
  "image/png"  // Registered and detailed by the PNG specification, not an RFC
] as const;

// Create a type from the array using typeof and indexed access
type ContentType = typeof VALID_COMMON_CONTENT_TYPE[number];

// Export the original array of valid common content types
export const validContentTypes: ContentType[] = [...VALID_COMMON_CONTENT_TYPE];
