// Define a constant array of common authorization schemes with detailed comments
const VALID_AUTHORIZATION_TYPES = [
  "Basic",  // Uses a user ID and password, credentials are Base64-encoded; defined in RFC 7617
  "Bearer",  // Commonly used with OAuth 2.0, tokens such as JWTs; specified in RFC 6750
  "Digest",  // Enhances security by using MD5 hash of the password, nonce, and other components; specified in RFC 7616
  "APIKey",  // Not an official standard under RFC, but widely used in APIs for simple access control
  "OAuth"  // Framework for access delegation, commonly used as "Bearer"; tokens managed via OAuth 2.0, specified in RFC 6749
] as const;

// Create a type from the array using typeof and indexed access
type AuthorizationType = typeof VALID_AUTHORIZATION_TYPES[number];

// Export the original array of valid authorization types
export const validAuthorizationTypes: AuthorizationType[] = [...VALID_AUTHORIZATION_TYPES];
