import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const METADATA_ROUTES = new Set(["/opengraph-image", "/twitter-image", "/icon", "/apple-icon"]);

export default function middleware(request: NextRequest) {
  if (METADATA_ROUTES.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/",
    "/(pl|en)/:path*",
  ],
};
