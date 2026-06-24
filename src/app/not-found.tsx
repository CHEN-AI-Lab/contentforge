import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-bold text-gradient">404</p>
      <h1 className="mt-4 text-xl font-semibold">页面不存在</h1>
      <p className="mt-2 text-sm text-slate-400">
        你访问的链接可能已失效，或地址输入有误。
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-brand-600 px-6 py-3 text-sm font-medium text-white hover:bg-brand-500"
      >
        返回首页
      </Link>
    </div>
  );
}
