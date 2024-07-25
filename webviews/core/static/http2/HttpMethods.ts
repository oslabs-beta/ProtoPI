// @ts-nocheck

// Define the array of HTTP methods with const assertion and detailed comments
const VALID_METHODS = [
  'GET',       // Standard method for retrieving resources without any effect on the data.
  'POST',      // Standard method for creating or submitting data to the resource.
  'PUT',       // Standard method for replacing all current representations of the target resource with the request payload.
  'DELETE',    // Standard method for deleting the specified resource.
  'HEAD',      // Standard method for retrieving response headers identical to those of a GET request, but without the response body.
  'OPTIONS',   // Standard method for describing the communication options for the target resource.
  'PATCH',     // Standard method for making partial changes to a resource. Defined in RFC 5789.
  'TRACE',     // Standard method for performing a message loop-back test along the path to the target resource.
  'CONNECT',   // Standard method for establishing a tunnel to the server identified by the target resource.
  'PROPFIND',  // Extended method used by WebDAV for retrieving properties, defined in RFC 4918.
  'PROPPATCH', // Extended method used by WebDAV to change and delete multiple properties on a resource in a single atomic act, defined in RFC 4918.
  'MKCOL',     // Extended method used by WebDAV for creating collections (e.g., directories), defined in RFC 4918.
  'COPY',      // Extended method used by WebDAV to copy a resource from one URI to another, defined in RFC 4918.
  'MOVE',      // Extended method used by WebDAV to move a resource from one URI to another, defined in RFC 4918.
  'LOCK',      // Extended method used by WebDAV to lock a resource, defined in RFC 4918.
  'UNLOCK',    // Extended method used by WebDAV to unlock a resource, defined in RFC 4918.
  'LINK',      // Extended method sometimes used for establishing relationships between resources.
  'UNLINK',    // Extended method sometimes used to remove relationships between resources.
  'PURGE',     // Extended method often used with CDNs and reverse proxies to clear cached resources.
  'VIEW'       // Non-standard method occasionally used to retrieve information without any implied semantics.
] as const;

// Create a type from the array
type HttpMethod = typeof VALID_METHODS[number];

// Exporting validMethods as an array of all VALID_METHODS, typed explicitly as HttpMethod[]
export const validMethods: HttpMethod[] = [...VALID_METHODS];