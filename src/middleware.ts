import { type NextRequest, NextResponse } from 'next/server';
import HTTPClient from "./libs/HTTPClient";

const privateRoutes: string[] = [''];

export async function middleware(req: NextRequest) {
  const client = new HTTPClient(process.env.API_URL!);

  // Validate Token
  const response = await client.GetAsync('/istheapiworking'); // This is here for debugging purposes!!
  const isTokenValid = (await response.json())['message'] === 'yes!';

  if (isTokenValid) {
    if (req.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (privateRoutes.some(p => p.startsWith(req.nextUrl.pathname))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', ...privateRoutes],
}