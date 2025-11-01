"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {

   
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) {
      router.push("/signin");
      return;
    }




    const decoded = jwt.decode(token) as { name: string; role: string } | null;
    if (!decoded) {
      router.push("/signin");
      return;
    }

    setUser(decoded);
  }, [router]);

  if (!user)
  return (
    <nav className="h-full p-6 text-sm text-gray-400">
      <p>Loading...</p>
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
        <div className="text-xl font-semibold text-white">
          {user.role}
        </div>
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


