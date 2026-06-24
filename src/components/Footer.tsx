import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-white/10 bg-gray-950 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-gradient">ContentForge</p>
            <p className="mt-2 text-sm text-slate-400">{t("desc")}</p>
          </div>
          <div>
            <p className="font-medium text-slate-200">{t("product")}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/tool" className="hover:text-white">
                  {t("productTool")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  {t("productPricing")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-200">{t("resources")}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-white">
                  {t("resourcesBlog")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  {t("resourcesAbout")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-200">{t("contact")}</p>
            <div className="mt-3 space-y-1 text-sm text-slate-400">
              <p>hello@contentforge.app</p>
              <p>微信：ContentForge</p>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} ContentForge 内容熔炉. 保留所有权利。
        </p>
      </div>
    </footer>
  );
}