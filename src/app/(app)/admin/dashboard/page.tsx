import DashboardStats from "@/app/components/DashboaredStats";
import DashboardCharts from "@/app/components/DashboardCharts";
import AdminDashboardClient from "@/app/components/_AdminDashboardClient";

export default async function AdminDashboardPage() {
  const stats = {
    totalRevenue: 50000,
    totalStudents: 650,
    totalTeachers: 2,
    totalTransactions: 350,
    activeBatches: 45,
    courses: 52,
    transactionCoupon: 25,
  };

  return (
    <section className="min-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <AdminDashboardClient />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStats {...stats} />
      </div>

      <DashboardCharts />
    </section>
  );
}


