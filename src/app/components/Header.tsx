"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-[#222]">
      <h1 className="text-xl font-semibold text-[#00BFFF]">
        <Link href="/">CourseApp</Link>
        </h1>

      <div className="flex gap-3">
        {isDashboard ? (
          <Link
            href="/"
            className="px-4 py-2 rounded-md bg-[#00BFFF] text-black hover:bg-[#1E90FF]"
          >
            Home
          </Link>
        ) : (
          <>
            <Link
              href="/signin"
              className="px-4 py-2 rounded-md bg-[#111] text-white hover:bg-[#181818] border border-[#333]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-[#00BFFF] text-black hover:bg-[#1E90FF]"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
