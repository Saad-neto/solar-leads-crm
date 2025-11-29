const BACKEND_URL = 'http://95.217.158.112:3003';

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    const url = new URL(request.url);
    const backendUrl = BACKEND_URL + url.pathname + url.search;

    let body = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.blob();
    }

    // Clone headers and remove problematic ones
    const headers = new Headers(request.headers);
    headers.delete('cf-ray');
    headers.delete('cf-connecting-ip');
    headers.delete('cf-ipcountry');
    headers.delete('cf-visitor');
    headers.delete('cf-request-id');

    // Add host header
    headers.set('host', '95.217.158.112:3003');

    const backendRequest = new Request(backendUrl, {
      method: request.method,
      headers: headers,
      body: body
    });

    try {
      const backendResponse = await fetch(backendRequest);
      const response = new Response(backendResponse.body, backendResponse);

      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return response;
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message,
        message: 'Erro ao conectar com o backend'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }
};
