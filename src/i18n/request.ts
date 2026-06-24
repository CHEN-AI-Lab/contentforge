import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async () => {
  // Detect locale from cookie or Accept-Language header
  let locale: Locale = routing.defaultLocale;

  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value as Locale | undefined;
    if (cookieLocale && routing.locales.includes(cookieLocale)) {
      locale = cookieLocale;
    }
  } catch {
    // cookies() may fail in some edge environments
  }

  if (locale === routing.defaultLocale) {
    try {
      const headersList = await headers();
      const acceptLang = headersList.get("accept-language");
      if (acceptLang) {
        const preferred = acceptLang
          .split(",")
          .map((l) => l.split(";")[0].trim())
          .find((l) => routing.locales.includes(l as Locale)) as Locale | undefined;
        if (preferred) locale = preferred;
      }
    } catch {
      // headers() may fail in some edge environments
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});