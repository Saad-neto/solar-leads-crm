const BACKEND_URL = 'http://95.217.158.112:3003';

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    try {
      const url = new URL(request.url);
      const backendUrl = BACKEND_URL + url.pathname + url.search;

      const modifiedRequest = new Request(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : null,
      });

      const response = await fetch(modifiedRequest);
      const modifiedResponse = new Response(response.body, response);

      modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
      modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      modifiedResponse.headers.set('Access-Control-Allow-Credentials', 'true');

      return modifiedResponse;

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
  },
};
