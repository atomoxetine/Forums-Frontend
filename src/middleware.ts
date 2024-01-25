import { type NextRequest, NextResponse } from 'next/server';
import getSession from "./libs/session/getSession";

const privateRoutes: string[] = [];
export const config = {
  matcher: ['/auth/:path*', '/u/:path*'],
}

export async function middleware(req: NextRequest) {
  const session = await getSession();

  if (session.isLoggedIn) {
    if (req.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/', req.url), 302);
    }
  } else if (privateRoutes.some(p => p.startsWith(req.nextUrl.pathname))) {
    return NextResponse.redirect(new URL('/auth/login', req.url), 302);
  }

  if (req.nextUrl.pathname.startsWith('/u')) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-url', req.url);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  return NextResponse.next();
}