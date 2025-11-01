"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const fetchEnrolledStudents = async () => {
  return [
    {
      id: "1",
      studentName: "Aarav Mehta",
      email: "aarav@example.com",
      mobile: "+91 9876543210",
      courseName: "Kathak Beginner Level",
    },
    {
      id: "2",
      studentName: "Priya Sharma",
      email: "priya@example.com",
      mobile: "+91 9123456789",
      courseName: "Kathak Advanced Performance",
    },
    {
      id: "3",
      studentName: "Rohan Verma",
      email: "rohan@example.com",
      mobile: "+91 9998887776",
      courseName: "Classical Fusion Workshop",
    },
  ];
};

export default function EnrolledStudentsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["enrolled-students"],
    queryFn: fetchEnrolledStudents,
  });

  if (isLoading)
    return <p className="text-center text-gray-400">Loading data...</p>;

  if (isError)
    return (
      <p className="text-center text-red-500">
        Failed to fetch enrolled students.
      </p>
    );

  return (
    <section className="w-full p-6">
      <Card className="bg-[#0a0a0a] border border-[#222] text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-[#00BFFF]">
            Enrolled Students
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#333]">
                  <TableHead className="text-gray-400">#</TableHead>
                  <TableHead className="text-gray-400">Student Name</TableHead>
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Mobile</TableHead>
                  <TableHead className="text-gray-400">Course</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data?.map((student, index) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-[#1a1a1a] transition-colors"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.mobile}</TableCell>
                    <TableCell>{student.courseName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
