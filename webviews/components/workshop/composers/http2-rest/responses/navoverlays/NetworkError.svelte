<!-- async function makeRequest(url: string, method: string, headers: Record<string, string>, body: string) {
  const startTime = performance.now();

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined
    });

    const endTime = performance.now();
    const duration = endTime - startTime;

    const responseData = await response.text();
    const responseHeaders = Object.fromEntries(response.headers.entries());

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseData,
      duration: duration.toFixed(2) // in milliseconds, rounded to 2 decimal places
    };
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;

    return {
      error: error.message,
      duration: duration.toFixed(2)
    };
  }
} -->


<!-- https://github.com/microsoft/vscode-icons/tree/main/icons/dark -->