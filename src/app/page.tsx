import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home");

  const features = [
    { icon: "🚀", title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: "🎯", title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: "⚡", title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: "💰", title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  const stats = [
    { value: t("statTime"), label: t("statTimeLabel") },
    { value: t("statPlatforms"), label: t("statPlatformsLabel") },
    { value: t("statPrice"), label: t("statPriceLabel") },
  ];

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-gray-950 to-gray-950" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-block rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-sm text-brand-300">
            {t("badge")}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            {t("headline")}
            <span className="text-gradient"> {t("headlineAccent")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/tool"
              className="rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 px-8 py-4 font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:opacity-90"
            >
              {t("cta")}
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/20 px-8 py-4 font-medium text-slate-300 transition hover:bg-white/5"
            >
              {t("ctaAlt")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] py-12">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-12 px-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-gradient">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold">
            {t("featuresTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
            {t("featuresSub")}
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {[
              ["📕", "小红书"],
              ["💬", "公众号"],
              ["🔥", "微博"],
              ["🎬", "抖音口播"],
              ["📹", "视频号"],
              ["📺", "B站"],
              ["🔍", "SEO"],
            ].map(([icon, name]) => (
              <li
                key={name}
                className="glass rounded-xl py-4 text-center text-sm text-slate-300"
              >
                <span className="text-2xl">{icon}</span>
                <p className="mt-2">{name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold">
          {t("featuresHeading")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
          {t("featuresDesc")}
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 text-center sm:px-6">
        <h2 className="text-2xl font-bold">{t("stepsTitle")}</h2>
        <ol className="mt-8 space-y-6 text-left text-slate-300">
          <li className="glass rounded-xl p-5">
            <strong className="text-brand-400">1. {t("step1")}</strong>
            — {t("step1Desc")}
          </li>
          <li className="glass rounded-xl p-5">
            <strong className="text-brand-400">2. {t("step2")}</strong>
            — {t("step2Desc")}
          </li>
          <li className="glass rounded-xl p-5">
            <strong className="text-brand-400">3. {t("step3")}</strong>
            — {t("step3Desc")}
          </li>
        </ol>
        <Link
          href="/tool"
          className="mt-10 inline-block rounded-xl bg-brand-600 px-8 py-3 font-medium text-white hover:bg-brand-500"
        >
          {t("footerCta")}
        </Link>
      </section>
    </>
  );
}