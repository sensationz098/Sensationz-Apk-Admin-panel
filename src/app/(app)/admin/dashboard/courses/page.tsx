import AdminCoursesClient from "@/app/components/AdminCourseClient";

export default async function AdminCoursesPage() {
  return (
    <section className="w-full px-4">
      <h1 className="text-3xl font-semibold mb-6 text-white">Courses</h1>
      <AdminCoursesClient />
    </section>
  );
}



