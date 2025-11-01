


"use client";

import { useState } from "react";
import DashboardStats from "@/app/components/DashboaredStats";
import CreateCourseModal from "@/app/components/CreateCourseModal";
import DashboardCharts from "@/app/components/DashboardCharts";
import CreateTeacherModal from "@/app/components/CreateTeacherModal";

export default function DashboardPage() {
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);

  return (
    <section className="min-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setIsTeacherOpen(true)}
            className="bg-[#00BFFF] hover:bg-[#1E90FF] text-black font-medium px-5 py-2 rounded-md"
          >
            + Add Teacher
          </button>

          <button
            onClick={() => setIsCourseOpen(true)}
            className="bg-[#00BFFF] hover:bg-[#1E90FF] text-black font-medium px-5 py-2 rounded-md"
          >
            + Create Course
          </button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats
          totalRevenue={50000}
          totalStudents={650}
          totalTeachers={2}
          totalTransactions={350}
          activeBatches={45}
          courses={52}
          transactionCoupon={25}
        />
      </div>

      <DashboardCharts />

      {isCourseOpen && <CreateCourseModal onClose={() => setIsCourseOpen(false)} />}
      {isTeacherOpen && <CreateTeacherModal onClose={() => setIsTeacherOpen(false)} />}
    </section>
  );
}
