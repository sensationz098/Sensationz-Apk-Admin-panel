"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname()
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/courses", label: "Courses" },
     { href: "/dashboard/students", label: "Students" },
    { href: "/dashboard/transactionCoupon", label: "transaction Coupon" },
   
    // { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <nav className="h-full p-6 text-sm text-gray-200">
      <div className="mb-8">
        <div className="text-xl font-semibold text-white">Who logged In</div>
        <div className="text-xs text-gray-500 mt-1">Admin</div>
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


