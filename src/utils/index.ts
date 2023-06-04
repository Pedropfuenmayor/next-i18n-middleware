import type { NextRequest } from 'next/server';
import langParser from 'accept-language-parser';

export const getRequestedLocales = (request: NextRequest) => {
  const requestedLocales = request.headers.get('accept-language');
    if (!requestedLocales) {
        throw new Error('No accept-language header present in the request');
    }
  const parsed = langParser.parse(requestedLocales);
  const locales = parsed.map(
    (locale) => `${locale.code}${locale.region ? `-${locale.region}` : ''}`
  );
  return locales;
};

export const getLocaleInPathname = (pathname:string) => {
  const pathnameParts = pathname.toLowerCase().split('/');
  return pathnameParts[1];
};

export const isPathnameMissingValidLocale = (locales: string[], pathname:string) =>
  locales.every((locale) => {
    return !pathname.startsWith(`/${locale}`);
  });