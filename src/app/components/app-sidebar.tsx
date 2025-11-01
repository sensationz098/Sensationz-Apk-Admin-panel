


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type User = { name: string; role: "ADMIN" | "TEACHER" };

async function fetchUser(): Promise<User> {
  const res = await fetch("/api/me", { credentials: "include" });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, 
    retry: false,
  });

  useEffect(() => {
    if (isError) router.push("/signin");
  }, [isError, router]);

  if (isLoading)
    return (
      <nav className="h-full p-6 text-sm text-gray-400">
        <p>Loading...</p>
      </nav>
    );
  // console.log("user is -----appsidebar-",user)

  if (!user)
    return (
      <nav className="h-full p-6 text-sm text-gray-400">
        <p>Redirecting...</p>
      </nav>
    );

  const links =
    user.role === "ADMIN"
      ? [
          { href: "/admin/dashboard", label: "Dashboard" },
          { href: "/admin/dashboard/courses", label: "Courses" },
          { href: "/admin/dashboard/students", label: "Students" },
          { href: "/admin/dashboard/teachers", label: "Teachers" },
          { href: "/admin/dashboard/activeBatches", label: "Active Batches" },
          { href: "/admin/dashboard/transactions", label: "Transactions" },
          { href: "/admin/dashboard/transactionCoupon", label: "Transaction Coupon" },
        ]
      : [
          { href: "/teacher/dashboard", label: "Dashboard" },
          { href: "/teacher/dashboard/myCourses", label: "MyCourses" },
          { href: "/teacher/dashboard/enrolledStudents", label: "Enrolled Students" },
        ];

  return (
    <nav className="h-full p-6 text-sm text-gray-200">
      <div className="mb-8">
        <div className="text-xl font-semibold text-white">{user.role}</div>
        <div className="text-xs text-gray-500 mt-1">{user.name}</div>
      </div>

      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-[#1E90FF] text-white"
                  : "hover:bg-[#171717]"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
