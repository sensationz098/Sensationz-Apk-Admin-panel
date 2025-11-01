"use client";

import { useQuery } from "@tanstack/react-query";

interface Batch {
  id: string;
  courseName: string;
  teacher: string;
  students: number;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "COMPLETED";
}

const mockBatches: Batch[] = [
  {
    id: "1",
    courseName: "Kathak Beginners",
    teacher: "Jane Smith",
    students: 18,
    startDate: "2025-09-15",
    endDate: "2026-03-15",
    status: "ACTIVE",
  },
  {
    id: "2",
    courseName: "Advanced Kathak",
    teacher: "John Doe",
    students: 12,
    startDate: "2025-08-01",
    endDate: "2026-02-01",
    status: "ACTIVE",
  },
  {
    id: "3",
    courseName: "Summer Kathak Camp",
    teacher: "Priya Sharma",
    students: 20,
    startDate: "2025-05-10",
    endDate: "2025-07-20",
    status: "COMPLETED",
  },
];

async function fetchBatches(): Promise<Batch[]> {
  // const res = await fetch("/api/batches");
  // if (!res.ok) throw new Error("Failed to fetch batches");
  // return res.json();
  return mockBatches.filter((b) => b.status === "ACTIVE");
}

export default function ActiveBatchesClient() {
  const { data: batches, isLoading, error } = useQuery({
    queryKey: ["active-batches"],
    queryFn: fetchBatches,
  });

  if (isLoading)
    return <div className="text-center text-gray-400 py-10">Loading batches...</div>;

  if (error)
    return <div className="text-center text-red-500 py-10">Failed to load batches.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {batches?.map((batch) => (
        <div
          key={batch.id}
          className="bg-[#111] border border-[#222] rounded-2xl hover:scale-[1.02] transition-transform"
        >
          <div className="p-5 space-y-2">
            <h2 className="text-lg font-semibold text-[#00BFFF]">
              {batch.courseName}
            </h2>
            <p className="text-gray-400 text-sm">
              Teacher: <span className="text-white">{batch.teacher}</span>
            </p>
            <p className="text-gray-400 text-sm">
              Students: <span className="text-white">{batch.students}</span>
            </p>
            <p className="text-gray-400 text-sm">
              Duration:{" "}
              <span className="text-white">
                {new Date(batch.startDate).toLocaleDateString()} →{" "}
                {new Date(batch.endDate).toLocaleDateString()}
              </span>
            </p>
            <span className="inline-block mt-3 px-3 py-1 text-xs font-medium bg-[#00BFFF]/20 text-[#00BFFF] rounded-full">
              {batch.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
