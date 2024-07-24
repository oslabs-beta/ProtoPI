// @ts-nocheck

// Define a constant array of common cache-control directives with detailed comments
const VALID_CACHE_CONTROL = [
  "no-cache",  // Indicates that the cached version should not be used without validation
  "no-store",  // Directs caches not to store the response
  "max-age=0",  // Specifies the maximum amount of time a resource is considered fresh
  "must-revalidate",  // Indicates that once a resource becomes stale, it must be revalidated before use
  "public",  // Indicates that the response may be cached by any cache
  "private"  // Indicates that the response is intended for a single user and must not be stored by shared caches
] as const;

// Create a type from the array using typeof and indexed access
type CacheControlDirective = typeof VALID_CACHE_CONTROL[number];

// Export the original array of valid cache control directives
export const validCacheControls: CacheControlDirective[] = [...VALID_CACHE_CONTROL];
