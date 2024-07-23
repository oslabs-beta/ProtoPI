

export function validateDateHeader(dateString: string): boolean {

  // IMF-fixdate, specified in RFC 7231
  const imfFixDateFormat = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} \d{2}:\d{2}:\d{2} GMT$/;
  // RFC 850 date, specified in RFC 7231
  const rfc850DateFormat = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), \d{2}-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2} \d{2}:\d{2}:\d{2} GMT$/;
  // ANSI C's asctime() format, specified in RFC 7231
  const asctimeDateFormat = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [ \d]\d \d{2}:\d{2}:\d{2} \d{4}$/;
  // ISO 8601 format, international standard not specifically listed in RFC 7231
  const iso8601DateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[\+\-]\d{2}:\d{2})$/;
  // Simple YYYY-MM-DD format, common in databases and user interfaces
  const simpleDateFormat = /^\d{4}-\d{2}-\d{2}$/;
  // US format MM/DD/YYYY, common in the United States
  const usDateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  // European format DD/MM/YYYY, common in European countries
  const europeanDateFormat = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  // Unix timestamp format (seconds since epoch), used in various programming and logging applications
  const timeStampFormat = /^\d{10}$/;
  // ISO 8601 extended without timezone, commonly used in databases
  const extendedIso8601 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  // Verbose format used in formal documents and reports
  const verboseDateFormat = /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/;

  // Check if the date string matches any of the valid date formats
  return imfFixDateFormat.test(dateString) ||
         rfc850DateFormat.test(dateString) ||
         asctimeDateFormat.test(dateString) ||
         iso8601DateFormat.test(dateString) ||
         simpleDateFormat.test(dateString) ||
         usDateFormat.test(dateString) ||
         europeanDateFormat.test(dateString) ||
         timeStampFormat.test(dateString) ||
         extendedIso8601.test(dateString) ||
         verboseDateFormat.test(dateString);
}

// // Usage examples
// const validDates = [
//   "Sun, 06 Nov 1994 08:49:37 GMT",  // IMF-fixdate
//   "Sunday, 06-Nov-94 08:49:37 GMT",  // RFC 850 date
//   "Sun Nov  6 08:49:37 1994",  // ANSI C's asctime() format
//   "2021-06-01T12:00:00Z",  // ISO 8601 format
//   "2021-06-01",  // Simple YYYY-MM-DD format
//   "12/31/2021",  // US format MM/DD/YYYY
//   "31/12/2021",  // European format DD/MM/YYYY
//   "1622549760",  // Unix timestamp format
//   "2021-06-01 12:00:00",  // ISO 8601 extended format commonly used in databases
//   "December 25, 2021"  // Verbose date format
// ];

// validDates.forEach(date => console.log(`${date}: ${validateDateHeader(date)}`));
