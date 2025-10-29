// main code aws

// import DashboardStats from "@/app/components/DashboaredStats";

// type DashboardData = {
//   totalRevenue: number;
//   totalStudents: number;
//   totalTransactions: number;
//   activeBatches: number;
// };

// async function getDashboardData(): Promise<DashboardData> {
//   const res = await fetch(`${process.env.AWS_API_BASE_URL}/admin/stats`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.AWS_API_KEY}`,
//     },
//     // revalidate every 5 minutes
//     next: { revalidate: 300 },
//   });

//   if (!res.ok) throw new Error("Failed to fetch dashboard data");
//   return res.json();
// }

// export default async function DashboardPage() {
//   const data = await getDashboardData();

//   return (
//     <section className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         <DashboardStats
//           totalRevenue={data.totalRevenue}
//           totalStudents={data.totalStudents}
//           totalTransactions={data.totalTransactions}
//           activeBatches={data.activeBatches}
//         />
//       </div>

//       <div className="mt-8 bg-[#111] border border-[#222] rounded-2xl p-6">
//         <p className="text-gray-400">
//           Welcome to the dashboard. Add widgets here.
//         </p>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useState } from "react";
// import DashboardStats from "@/app/components/DashboaredStats";
// import CreateCourseModal from "@/app/components/CreateCourseModal";

// export default function DashboardPage() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <section className="min-w-7xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
//         <button
//           onClick={() => setIsOpen(true)}
//           className="bg-[#00BFFF] hover:bg-[#1E90FF] text-black font-medium px-5 py-2 rounded-md transition-colors"
//         >
//           + Create Course
//         </button>
//       </div>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         <DashboardStats
//           totalRevenue={50000}
//           totalStudents={650}
//           totalTransactions={350}
//           activeBatches={45}
//         />
//       </div>

//       <div className="mt-8 bg-[#111] border border-[#222] rounded-2xl p-6">
//         <p className="text-gray-400">Welcome to the dashboard. Add widgets here.</p>
//       </div>

//       {isOpen && <CreateCourseModal onClose={() => setIsOpen(false)} />}
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import DashboardStats from "@/app/components/DashboaredStats";
import CreateCourseModal from "@/app/components/CreateCourseModal";
import DashboardCharts from "@/app/components/DashboardCharts";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#00BFFF] hover:bg-[#1E90FF] text-black font-medium px-5 py-2 rounded-md transition-colors"
        >
          + Create Course
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats
          totalRevenue={50000}
          totalStudents={650}
          totalTransactions={350}
          activeBatches={45}
        />
      </div>

      {/* Charts */}
      <DashboardCharts />

      {isOpen && <CreateCourseModal onClose={() => setIsOpen(false)} />}
    </section>
  );
}
