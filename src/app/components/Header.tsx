"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/teacher/dashboard");

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-[#222]">
      <h1 className="text-xl font-semibold text-[#00BFFF]">
        <Link href="/">CourseApp</Link>
      </h1>

      <div className="flex gap-3">
        {isDashboard ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-[#00BFFF] text-black hover:bg-[#1E90FF]"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/signin"
            className="px-4 py-2 rounded-md bg-[#111] text-white hover:bg-[#181818] border border-[#333]"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
