import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PRICING } from "@/config/platforms";

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  const plans: Array<{
    key: "free" | "pro" | "team";
    highlight: boolean;
    features: string[];
  }> = [
    {
      key: "free",
      highlight: false,
      features: [
        "每日 5 次内容改编",
        "7 大平台 + 3 种语气",
        "在线复制导出",
        "社区支持",
      ],
    },
    {
      key: "pro",
      highlight: true,
      features: [
        "每月 200 次改编",
        "全部平台 + 语气调节",
        "历史记录 30 天",
        "优先邮件支持",
        "去除页脚品牌",
      ],
    },
    {
      key: "team",
      highlight: false,
      features: [
        "每月 1000 次改编",
        "5 个席位",
        "品牌自定义",
        "API 访问（即将上线）",
        "专属 onboarding",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-slate-400">{t("subtitle")}</p>
      </div>
      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {plans.map(({ key, highlight, features }) => {
          const plan = PRICING[key];
          return (
            <div
              key={key}
              className={`rounded-2xl border p-8 ${
                highlight
                  ? "border-brand-500 bg-gradient-to-b from-brand-500/20 to-transparent shadow-xl shadow-brand-500/10"
                  : "glass"
              }`}
            >
              {highlight && (
                <span className="mb-4 inline-block rounded-full bg-brand-500/30 px-3 py-1 text-xs text-brand-200">
                  {t("popular")}
                </span>
              )}
              <h2 className="text-xl font-semibold">
                {key === "free" ? t("freeName") : key === "pro" ? t("proName") : t("teamName")}
              </h2>
              <p className="mt-4">
                <span className="text-4xl font-bold">¥{plan.price}</span>
                {plan.price > 0 && (
                  <span className="text-slate-500">{t("perMonth")}</span>
                )}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {key === "free" ? t("freeDesc") : key === "pro" ? t("proDesc") : t("teamDesc")}
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                {features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brand-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={key === "free" ? "/tool" : "/tool"}
                className={`mt-8 block rounded-xl py-3 text-center font-medium transition ${
                  highlight
                    ? "bg-brand-600 text-white hover:bg-brand-500"
                    : "border border-white/20 hover:bg-white/5"
                }`}
              >
                {key === "free" ? t("freeCta") : t("proCta")}
              </Link>
            </div>
          );
        })}
      </div>
      <p className="mt-12 text-center text-sm text-slate-500">{t("note")}</p>
    </div>
  );
}