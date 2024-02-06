import { type NextRequest, NextResponse } from 'next/server';
import getSession from "./libs/session/getSession";

export const config = {
  matcher: ['/auth/:path*', '/u/:path*', '/forums/:path*', '/support/:path*', '/op/:path*', '/a/:path*', '/support/:path*'],
}
export async function middleware(req: NextRequest) {
  const session = await getSession();
  const route = req.nextUrl.pathname;

  switch (route.split('/')[1]) {
    // Auth Page redirects if user already logged in
    case "auth":
      if (session.isLoggedIn)
        return NextResponse.redirect(new URL('/', req.url), 302);
      break;

    // Pages that need URL for loading at server time
    case "u":
    case "forums":
    case "support":
      req.headers.set('x-url', req.url);
      return NextResponse.next({ request: { headers: req.headers } });

    // Admin Pages
    case "op":
      const userIsAdmin = true; // Check if user is admin - TODO
      if (!userIsAdmin)
        return NextResponse.json({
          message: 'You do not have permission to see this page. If you think this is a mistake, please contact the Support.'
        }, { status: 401 });
      break;

    // Protected Pages ask you to login first then redirect you back
    case "a":
    case "support":
      if (!session.isLoggedIn)
        return NextResponse.redirect(new URL('/auth/login?' + new URLSearchParams({ redirect: req.url }), req.url), 302);
      break;

    default:
      break;
  }
  return NextResponse.next();
}