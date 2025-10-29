

"use client";

import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Student {
  id: number;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  state: string;
}
// Mock data (replace with API call later)
const students: Student[] = Array.from({ length: 32 }).map((_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@mail.com`,
  mobile: `99999${1000 + i}`,
  gender: i % 2 === 0 ? "Male" : "Female",
  state: i % 3 === 0 ? "Maharashtra" : "Delhi",
}));

export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const start = (page - 1) * perPage;
  const paginated = students.slice(start, start + perPage);
  const totalPages = Math.ceil(students.length / perPage);

  return (
    <section className="w-full px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-white tracking-tight">Students</h1>
        <Button className="bg-[#00BFFF] text-black font-medium hover:bg-[#1E90FF] transition">
          + Add Student
        </Button>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-2xl shadow-lg overflow-hidden">
        {/* Table */}
        <div className="overflow-y-auto max-h-[70vh]">
          <Table className="w-full">
            <TableCaption className="text-gray-400">
              List of registered students
            </TableCaption>

            <TableHeader className="sticky top-0 bg-[#181818] z-10">
              <TableRow>
                <TableHead className="text-gray-300 font-medium py-4">Name</TableHead>
                <TableHead className="text-gray-300 font-medium">Email</TableHead>
                <TableHead className="text-gray-300 font-medium">Mobile</TableHead>
                <TableHead className="text-gray-300 font-medium">Gender</TableHead>
                <TableHead className="text-gray-300 font-medium">State</TableHead>
                <TableHead className="text-gray-300 font-medium text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginated.map((student) => (
                <TableRow key={student.id} className="hover:bg-[#181818] transition-colors">
                  <TableCell className="text-white">{student.name}</TableCell>
                  <TableCell className="text-gray-300">{student.email}</TableCell>
                  <TableCell className="text-gray-300">{student.mobile}</TableCell>
                  <TableCell className="text-gray-300">{student.gender}</TableCell>
                  <TableCell className="text-gray-300">{student.state}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-[#00BFFF] text-black hover:bg-[#1E90FF]"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between p-4 border-t border-[#222]">
          <Button
            variant="secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-[#181818] text-gray-300 hover:text-white"
          >
            Previous
          </Button>
          <span className="text-gray-400 text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="bg-[#181818] text-gray-300 hover:text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}