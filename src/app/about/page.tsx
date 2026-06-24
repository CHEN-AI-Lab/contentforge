import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return { title: `${t("title")} | ContentForge` };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <div className="mt-8 space-y-6 text-slate-300 leading-relaxed">
              <p>{t("intro")}</p>
              <p>{t("intro2")}</p>
              <p>{t("origin")}</p>
        <h2 className="text-xl font-semibold text-white">{t("mission")}</h2>
        <p>{t("missionDesc")}</p>
        <h2 className="text-xl font-semibold text-white">{t("business")}</h2>
        <p>{t("businessDesc")}</p>
        <h2 className="text-xl font-semibold text-white">{t("contact")}</h2>
        <p>
          {t("email")}
          <br />
          {t("wechat")}
        </p>
      </div>
      <Link
        href="/tool"
        className="mt-10 inline-block rounded-xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-500"
      >
        {t("cta")}
      </Link>
    </div>
  );
}