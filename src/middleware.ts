import { type NextRequest, NextResponse } from 'next/server';
import { getSession } from "./libs/session/iron";

const privateRoutes: string[] = [];
export const config = {
  matcher: ['/auth/:path*'],
}

export async function middleware(req: NextRequest) {
  const session = await getSession();

  if (session.isLoggedIn) {
    if (req.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (privateRoutes.some(p => p.startsWith(req.nextUrl.pathname))) {
    return NextResponse.redirect(new URL('/auth/login', req.url), 302);
  }

  return NextResponse.next();
}