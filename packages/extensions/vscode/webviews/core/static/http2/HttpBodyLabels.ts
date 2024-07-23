// Enum for content types specific to raw data
export enum ContentType {
  Text = "text", // Typically used in MIME type text/plain, defined in RFC 2046
  JSON = "json", // Standard MIME type application/json, defined in RFC 8259
  JavaScript = "javascript", // MIME type application/javascript, defined in RFC 4329
  HTML = "html", // MIME type text/html, defined in RFC 2854
  XML = "xml" // MIME type application/xml, defined in RFC 7303
}

// Define a constant array of simple body label strings with comments
const SIMPLE_BODY_LABELS = [
  "none", // Represents no content, not associated with a MIME type
  "formData", // Used for multipart/form-data as defined in RFC 7578
  "urlEncoded", // Used for application/x-www-form-urlencoded, common in HTML forms but not specifically defined in an RFC
  "binary", // Typically used for application/octet-stream, not defined in a specific RFC but commonly used for arbitrary binary data
  "graphql", // Not standardized in an RFC but used for GraphQL operations
  "sparql" // Used for SPARQL query operations, not defined in a specific RFC but widely used in semantic web technologies
] as const;

// Manually handle the complex object type for 'raw'
type RawContentType = { type: "raw", contentType: ContentType }; // Explicitly linking raw types to ContentType, mapping directly to MIME standards

// Union type combining simple labels and the complex type
export type BodyLabel = typeof SIMPLE_BODY_LABELS[number] | RawContentType;