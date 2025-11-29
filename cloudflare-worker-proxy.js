/**
 * Cloudflare Worker - API Proxy HTTPS
 *
 * Este worker recebe requisições HTTPS e encaminha para o backend HTTP,
 * resolvendo problemas de Mixed Content.
 *
 * Deploy: Cloudflare Dashboard > Workers & Pages > Create Worker
 */

const BACKEND_URL = 'http://95.217.158.112:3003';

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    try {
      // Get the URL from the request
      const url = new URL(request.url);

      // Build the backend URL (preserving path and query string)
      const backendUrl = BACKEND_URL + url.pathname + url.search;

      // Clone the request to modify it
      const modifiedRequest = new Request(backendUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD'
          ? await request.blob()
          : null,
      });

      // Forward the request to backend
      const response = await fetch(modifiedRequest);

      // Clone the response to modify headers
      const modifiedResponse = new Response(response.body, response);

      // Add CORS headers
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

function handleCORS() {
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
