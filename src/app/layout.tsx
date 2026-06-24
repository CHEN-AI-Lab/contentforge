import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const locale = await getLocale();
  const isZh = locale === "zh-CN";

  return {
    title: isZh
      ? "ContentForge 内容熔炉 | 一篇长文，全网分发"
      : "ContentForge | Write Once, Publish Everywhere",
    description: isZh
      ? "AI 多平台内容改编工具。一键生成小红书、公众号、微博、抖音口播、视频号、B 站与 SEO 标题包。"
      : "AI multi-platform content repurposing tool. Generate copy for Xiaohongshu, WeChat, Weibo, Douyin, and more in one click.",
    keywords: [
      "content repurposing",
      "AI writing",
      "自媒体工具",
      "小红书文案",
      "AI 写作",
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale === "zh-CN" ? "zh-CN" : "en"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-950 font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}