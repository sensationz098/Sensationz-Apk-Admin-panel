"use client";

import { useQuery } from "@tanstack/react-query";

interface Course {
  id: string;
  name: string;
  duration: number;
  mrp: number;
  thumbnail: string;
  totalStudents:number
}



const mockCourses: Course[] = [
  {
    id: "1",
    name: "Kathak Basics",
    duration: 6,
    mrp: 2500,
    totalStudents:36,
    thumbnail:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
  },
  {
    id: "2",
    name: "Advanced Kathak",
    duration: 12,
    mrp: 3500,
        totalStudents:36,

    thumbnail:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400",
  },
    {
    id: "1",
    name: "Kathak Basics",
    duration: 6,
    mrp: 2500,
        totalStudents:36,

    thumbnail:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400",
  },
 

];

async function fetchCourses(): Promise<Course[]> {
  // const res = await fetch("https://your-aws-endpoint.com/api/courses");
  // if (!res.ok) throw new Error("Failed to fetch courses");
  // return res.json();
  return mockCourses;
}

export default function CoursesPage() {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading)
    return (
      <div className="text-center text-gray-400 py-10">Loading courses...</div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load courses.
      </div>
    );

  return (
<section className="w-full px-4">
  <h1 className="text-3xl font-semibold mb-6 text-white">Courses</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {courses?.map((course) => (
      <div
        key={course.id}
        className="bg-[#111] border border-[#222] rounded-2xl hover:scale-[1.02] transition-transform"
      >
        <img
          src={course.thumbnail}
          alt={course.name}
          className="h-48 w-full object-cover"
        />

        <div className="p-4 space-y-2">
          <h2 className="text-lg font-semibold text-[#00BFFF]">
            {course.name}
          </h2>
          <h2 className="text-lg font-semibold text-[#00BFFF]">
           Total Students: {" "} {course.totalStudents}
          </h2>

          <p className="text-gray-400 text-sm">
            Duration:{" "}
            <span className="text-white">{course.duration} months</span>
          </p>
          <p className="text-gray-400 text-sm">
            MRP: <span className="text-white">₹{course.mrp}</span>
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

  );
}
