# next-i18n-middleware
This is a package created to handle i18n in Next.js projects.

## Install

```bash
# NPM
npm install --save next-i18n-middleware
```

## Example
```ts
// middleware.ts at the root of the project

import { createMiddleware } from "next-i18n-middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "de"],

  defaultLocale: "en",
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

```ts
// app/[locale]/layout.tsx

export default function RootLayout({ children, params: { locale } }) {
// pass locale to your i18n lib
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
## File Structure 


```
├── middleware.ts 
└── app
    └── [locale]
        ├── layout.tsx 
        └── page.tsx 
```