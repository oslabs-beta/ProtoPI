### Categories of HTTP Headers

#### General Headers
These headers apply to both requests and responses but are not directly related to the data in the body.
- **Cache-Control**
- **Connection** (note: Connection and connection-specific header fields, such as Keep-Alive, are prohibited in HTTP/2)
- **Date**
- **Via**

#### Request Headers
These headers contain more information about the resource to be fetched or about the client requesting the resource.
- **Accept**
- **Accept-Encoding**
- **Authorization**
- **Cookie**
- **User-Agent**
- **Host** (required in all HTTP/2 requests)

#### Response Headers
These headers hold additional information about the response, like its location or server type.
- **Server**
- **Set-Cookie**
- **WWW-Authenticate**
- **Location**

#### Entity Headers
These headers contain information about the body of the resource, like its content length or MIME type.
- **Content-Type**
- **Content-Length** (not used in HTTP/2 when sending data in multiple frames)
- **Content-Encoding**
- **Content-Language**

#### Pseudo-Headers (specific to HTTP/2)
These headers are used within HTTP/2 to convey special significance and must appear before regular headers in the request or response.
- **:method** – The HTTP method used (GET, POST, etc.).
- **:scheme** – The protocol being used (http or https).
- **:authority** – The authority (i.e., the domain name).
- **:path** – The path to the resource.
- **:status** – The status code for the response (only in response headers).
