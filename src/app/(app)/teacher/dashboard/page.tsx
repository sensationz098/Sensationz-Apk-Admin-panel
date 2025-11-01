"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function TeacherDashboardPage() {
  const router = useRouter();

  const teacherData = {
    myCourses: 5,
    enrolledStudents: 42,
    upcomingClasses: 2,
    notifications: 3,
    courses: [
      {
        id: "1",
        name: "Kathak Beginner",
        students: 15,
        thumbnail: "/placeholder.jpg",
      },
      {
        id: "2",
        name: "Classical Fusion Workshop",
        students: 10,
        thumbnail: "/placeholder.jpg",
      },
    ],
  };

  return (
    <section className="w-full p-6 space-y-6 text-white">
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          onClick={() => router.push("/teacher/dashboard/myCourses")}
          className="bg-[#111] border-[#222] cursor-pointer hover:bg-[#1a1a1a] transition-colors"
        >
          <CardHeader>
            <CardTitle className="text-[#00BFFF]">My Courses</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-white">
            {teacherData.myCourses}
          </CardContent>
        </Card>

        <Card
          onClick={() => router.push("/teacher/dashboard/enrolledStudents")}
          className="bg-[#111] border-[#222] cursor-pointer hover:bg-[#1a1a1a] transition-colors"
        >
          <CardHeader>
            <CardTitle className="text-[#00BFFF]">Enrolled  Students</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-white">
            {teacherData.enrolledStudents}
          </CardContent>
        </Card>
      </div>

      {/* My Courses Preview
      <div>
        <h2 className="text-xl font-semibold mb-3 text-[#00BFFF]">
          My Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teacherData.courses.map((course) => (
            <Card
              key={course.id}
              className="bg-[#111] border border-[#222] hover:scale-[1.02] transition-transform"
            >
              <img
                src={course.thumbnail}
                alt={course.name}
                className="h-40 w-full object-cover rounded-t-2xl"
              />
              <CardContent className="p-4">
                <p className="text-lg font-semibold">{course.name}</p>
                <p className="text-gray-400 text-sm">
                  {course.students} students
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </section>
  );
}
