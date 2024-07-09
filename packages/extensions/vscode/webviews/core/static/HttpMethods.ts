// RFC 7231 see https://datatracker.ietf.org/doc/html/rfc7231#section-4.1

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'TRACE'
  | 'CONNECT'
  | 'PROPFIND'
  | 'PROPPATCH'
  | 'MKCOL'
  | 'COPY'
  | 'MOVE'
  | 'LOCK'
  | 'UNLOCK'
  | 'LINK'
  | 'UNLINK'
  | 'PURGE'
  | 'VIEW';

  export const validMethods: HttpMethod[] = [
    'GET', 
    'POST', 
    'PUT', 
    'DELETE'
  ];