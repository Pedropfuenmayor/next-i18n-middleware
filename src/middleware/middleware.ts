import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";

import type { LocaleMiddlewareOptions } from "../middleware/types";

import {
  getRequestedLocales,
  isPathnameMissingValidLocale,
} from "../utils/index";

export default function createMiddleware({
  locales,
  defaultLocale,
}: LocaleMiddlewareOptions) {
  return (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const requestedLocales = getRequestedLocales(request);
    const matchedLocale = match(requestedLocales, locales, defaultLocale);

    if (isPathnameMissingValidLocale(locales, pathname)) {
        return NextResponse.redirect(
          new URL(`/${matchedLocale}${pathname}`, request.url)
        );
    }
  };
}
