// Define a constant array of common host values
const VALID_HOSTS = [
  "www.example.com",
  "api.example.org",
  "localhost:8080"
] as const;

// Create a type from the array using typeof and indexed access
type Host = typeof VALID_HOSTS[number];

// Export the original array of valid hosts
export const validHosts: Host[] = [...VALID_HOSTS];
