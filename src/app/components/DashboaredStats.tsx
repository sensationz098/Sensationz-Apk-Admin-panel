type Props = {
  totalRevenue: number;
  totalStudents: number;
  totalTransactions: number;
  activeBatches: number;
};

export default function DashboardStats({
  totalRevenue,
  totalStudents,
  totalTransactions,
  activeBatches,
}: Props) {
  const stats = [
    { key: "revenue", label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}` },
    { key: "students", label: "Students", value: totalStudents },
    { key: "transactions", label: "Transactions", value: totalTransactions },
    { key: "batches", label: "Active Batches", value: activeBatches },
  ];

  return (
    <>
      {stats.map((s) => (
        <div
          key={s.key}
          className="rounded-2xl bg-[#111] border border-[#222] p-6 text-center"
        >
          <h3 className="text-sm text-gray-400">{s.label}</h3>
          <div className="mt-3 text-2xl font-semibold text-[#1E90FF]">{s.value}</div>
        </div>
      ))}
    </>
  );
}
