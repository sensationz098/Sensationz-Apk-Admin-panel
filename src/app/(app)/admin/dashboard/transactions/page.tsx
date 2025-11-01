"use client";

import { useQuery } from "@tanstack/react-query";

type Transaction = {
  id: string;
  courseName: string;
  userName: string;
  email: string;
  phone: string;
  amount: number;
  createdAt: string;
};

export default function Transactions() {
  const { data, isLoading, isError } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
  



//       queryFn: async () => {
//   const res = await fetch("https://your-aws-endpoint/transactions");
//   if (!res.ok) throw new Error("Failed to fetch transactions");
//   return res.json();
// }


    queryFn: async () => {
      // Mock data for now
      await new Promise((r) => setTimeout(r, 800)); 
      return [
        {
          id: "txn_001",
          courseName: "Advanced Kathak Level 1",
          userName: "Riya Sharma",
          email: "riya@example.com",
          phone: "9876543210",
          amount: 2500,
          createdAt: new Date().toISOString(),
        },
        {
          id: "txn_002",
          courseName: "Kathak Masterclass",
          userName: "Amit Verma",
          email: "amit@example.com",
          phone: "9123456789",
          amount: 3500,
          createdAt: new Date().toISOString(),
        },
      ];
    },
  });

  if (isLoading) return <p className="text-gray-400">Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load transactions.</p>;
  if (!data?.length) return <p className="text-gray-400">No transactions found.</p>;

  return (
    <section className="w-full  px-4">
      <h1 className="text-3xl font-semibold mb-6">Transactions</h1>

      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-[#181818] text-gray-400 uppercase text-sm">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Course</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tx) => (
              <tr key={tx.id} className="border-t border-[#222] hover:bg-[#181818]">
                <td className="p-3">{tx.userName}</td>
                <td className="p-3">{tx.email}</td>
                <td className="p-3">{tx.phone}</td>
                <td className="p-3">{tx.courseName}</td>
                <td className="p-3">₹{tx.amount}</td>
                <td className="p-3">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
