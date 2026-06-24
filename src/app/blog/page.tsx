import { BLOG_POSTS } from "@/config/blog-posts";
import Link from "next/link";

export const metadata = {
  title: "博客 | ContentForge",
  description: "内容改编、自媒体变现与 Micro-SaaS 增长策略",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">博客</h1>
      <p className="mt-2 text-slate-400">
        内容改编实战、平台算法与微型 SaaS 变现 — 全部由 ContentForge 团队撰写。
      </p>
      <ul className="mt-12 space-y-8">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block glass rounded-2xl p-6 transition hover:border-brand-500/50"
            >
              <time className="text-xs text-slate-500">{post.date}</time>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-brand-300">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{post.excerpt}</p>
              <p className="mt-3 text-xs text-brand-400">
                阅读 {post.readMinutes} 分钟 →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
