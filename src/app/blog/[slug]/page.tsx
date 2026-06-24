import { BLOG_POSTS } from "@/config/blog-posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "文章未找到" };
  return { title: `${post.title} | ContentForge 博客` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/blog" className="text-sm text-brand-400 hover:underline">
        ← 返回博客
      </Link>
      <header className="mt-6">
        <time className="text-sm text-slate-500">{post.date}</time>
        <h1 className="mt-2 text-3xl font-bold leading-tight">{post.title}</h1>
        <p className="mt-3 text-slate-400">{post.excerpt}</p>
      </header>
      <div className="prose prose-invert mt-10 max-w-none space-y-4 text-slate-300">
        {paragraphs.map((block, i) => {
          if (block.startsWith("## ")) {
            return (
              <h2 key={i} className="mt-8 text-xl font-semibold text-white">
                {block.replace(/^## /, "")}
              </h2>
            );
          }
          if (block.startsWith("|")) {
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-lg bg-black/40 p-4 text-sm"
              >
                {block}
              </pre>
            );
          }
          if (block.startsWith("- ")) {
            const items = block.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={i} className="list-inside list-disc space-y-1">
                {items.map((item) => (
                  <li key={item}>{item.replace(/^- /, "")}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{block}</p>;
        })}
      </div>
      <div className="mt-12 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-6 text-center">
        <p className="font-medium">想把长文变成全平台文案？</p>
        <Link
          href="/tool"
          className="mt-4 inline-block rounded-lg bg-brand-600 px-6 py-2 text-white hover:bg-brand-500"
        >
          免费试用 ContentForge
        </Link>
      </div>
    </article>
  );
}
