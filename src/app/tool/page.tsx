import { RepurposeTool } from "@/components/RepurposeTool";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("tool");
  return { title: t("pageTitle"), description: t("pageDesc") };
}

export default async function ToolPage() {
  const t = await getTranslations("tool");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">{t("heading")}</h1>
      <p className="mt-2 text-slate-400">{t("subtitle")}</p>
      <div className="mt-8">
        <RepurposeTool />
      </div>
    </div>
  );
}