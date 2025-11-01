

"use client";

import { useRouter } from "next/navigation";

type Props = {
  totalRevenue: number;
  totalStudents: number;
  totalTeachers:number
  totalTransactions: number;
  activeBatches: number;
  courses:number,
 transactionCoupon:number
};

export default function DashboardStats({
  totalRevenue,
  totalStudents,
  totalTeachers,
  totalTransactions,
  activeBatches,
  courses,
  transactionCoupon,
}: Props) {
  const router = useRouter();

  const stats = [
    { key: "revenue", label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}` },
   
    { key: "courses", label: "Courses", value: courses }, 
     { key: "students", label: "Students", value: totalStudents },
     { key: "teachers", label: "Teachers", value: totalTeachers },

    { key: "activeBatches", label: "Active Batches", value: activeBatches },

    { key: "transactions", label: "Transactions", value: totalTransactions },
    { key: "transactionCoupon", label: "Transaction Coupon", value: transactionCoupon },

  ];

  const handleClick = (key: string) => {
    if (key === "students") router.push("/admin/dashboard/students");
    if (key === "teachers") router.push("/admin/dashboard/teachers");

    if (key === "courses") router.push("/admin/dashboard/courses");
    if (key === "transactions") router.push("/admin/dashboard/transactions");
    if (key === "transactionCoupon") router.push("/admin/dashboard/transactionCoupon");
    if (key === "activeBatches") router.push("/admin/dashboard/activeBatches");



  };

  return (
    <>
      {stats.map((s) => (
        <div
          key={s.key}
          onClick={() => handleClick(s.key)}
          className={`rounded-2xl bg-[#111] border border-[#222] p-6 text-center cursor-pointer transition-transform hover:scale-105 ${
            ["students", "courses","transactions","activeBatches","transactionCoupon","teachers"].includes(s.key)
              ? "hover:bg-[#1E90FF]/10"
              : ""
          }`}
        >
          <h3 className="text-sm text-gray-400">{s.label}</h3>
          <div className="mt-3 text-2xl font-semibold text-[#1E90FF]">
            {s.value}
          </div>
        </div>
      ))}
    </>
  );
}
