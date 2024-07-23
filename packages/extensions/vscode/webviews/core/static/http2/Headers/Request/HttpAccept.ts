// Define a constant array of common MIME types for Accept headers
const VALID_ACCEPT_TYPES = [
  "text/html",  // HTML format
  "application/json",  // JSON format
  "application/xml",  // XML format
  "image/jpeg",  // JPEG images
  "image/png",  // PNG images
  "*/*"  // Any type
] as const;

// Create a type from the array using typeof and indexed access
type AcceptType = typeof VALID_ACCEPT_TYPES[number];

// Export the original array of valid accept types
export const validAcceptTypes: AcceptType[] = [...VALID_ACCEPT_TYPES];
