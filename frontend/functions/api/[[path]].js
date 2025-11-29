// Cloudflare Pages Function para fazer proxy do backend
const BACKEND_URL = 'http://95.217.158.112:3003';

export async function onRequest(context) {
  const { request } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const url = new URL(request.url);
    const backendPath = url.pathname.replace(/^\/api/, '');
    const backendUrl = `${BACKEND_URL}${backendPath}${url.search}`;

    // Prepare request body
    let body = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.arrayBuffer();
    }

    // Prepare headers
    const headers = new Headers(request.headers);
    headers.set('host', '95.217.158.112:3003');

    // Make request to backend
    const backendResponse = await fetch(backendUrl, {
      method: request.method,
      headers: headers,
      body: body,
    });

    // Create response
    const response = new Response(backendResponse.body, backendResponse);

    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        message: 'Erro ao conectar com o backend',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
