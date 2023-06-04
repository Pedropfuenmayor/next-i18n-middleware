import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";

import type { LocaleMiddlewareOptions } from "../middleware/types";

import {
  getRequestedLocales,
  isPathnameMissingValidLocale,
  getLocaleInPathname,
} from "../utils/index";

export default function createMiddleware({
  locales,
  defaultLocale,
}: LocaleMiddlewareOptions) {
  return (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const localeInPathname = getLocaleInPathname(pathname);
    const requestedLocales = getRequestedLocales(request);
    const matchedLocale = match(requestedLocales, locales, defaultLocale);
    // Check if the default locale is in the pathname
    if (localeInPathname === defaultLocale) {
      // we want to REMOVE the default locale from the pathname,
      // and later use a rewrite so that Next will still match
      // the correct code file as if there was a locale in the pathname
      return NextResponse.redirect(
        new URL(pathname.replace(`/${defaultLocale}`, ""), request.url)
      );
    }
    if (isPathnameMissingValidLocale(locales, pathname)) {
      if (matchedLocale !== defaultLocale) {
        return NextResponse.redirect(
          new URL(`/${matchedLocale}${pathname}`, request.url)
        );
      } else {
        // rewrite it so next.js will render `/` as if it was `/en`
        return NextResponse.rewrite(
          new URL(`/${defaultLocale}${pathname}`, request.url)
        );
      }
    }
  };
}
