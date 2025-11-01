"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { CourseForm, CourseSchema } from "@/schemas/courseSchema";




interface Props {
  onClose: () => void;
}

export default function CreateCourseModal({ onClose }: Props) {
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<CourseForm>({ resolver: zodResolver(CourseSchema) });



  const mutation = useMutation({
    mutationFn: async (data: CourseForm) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("teacher", data.teacher);
      formData.append("description", data.description);
      formData.append("mrp", data.mrp.toString());
      formData.append("discount", data.discount.toString());
      formData.append("duration", data.duration.toString());
      formData.append("thumbnail", data.thumbnail[0]);

      const res = await fetch("/api/courses", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to create course");
      return res.json();
    },
    onSuccess: () => {
      alert("Course created successfully");
      reset();
      onClose();
    },
    onError: (err) => {
      console.error(err);
      alert("Error creating course");
    },
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] border border-[#222] p-8 rounded-2xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-[#00BFFF]">
          Create New Course
        </h2>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          {/* Course name */}
          <input
            {...register("name")}
            placeholder="Course Name"
            className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white focus:ring-1 focus:ring-[#00BFFF]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Teacher */}
          <select
            {...register("teacher")}
            className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white focus:ring-1 focus:ring-[#00BFFF]"
          >
            <option value="">Select Teacher</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
          {errors.teacher && (
            <p className="text-red-500 text-sm">{errors.teacher.message}</p>
          )}

          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Course Description"
            rows={3}
            className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white focus:ring-1 focus:ring-[#00BFFF]"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                {...register("mrp", { valueAsNumber: true })}
                placeholder="MRP"
                className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white"
              />
              {errors.mrp && (
                <p className="text-red-500 text-sm">{errors.mrp.message}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                {...register("discount", { valueAsNumber: true })}
                placeholder="Discount (%)"
                className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white"
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">
                  {errors.discount.message}
                </p>
              )}
            </div>
          </div>

          {/* Duration */}
          <input
            type="number"
            {...register("duration", { valueAsNumber: true })}
            placeholder="Duration (months)"
            className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
{/* Thumbnail */} 
 <div>
  <label className="block text-sm text-gray-300 mb-2">Thumbnail</label>
<button>
      <input
    type="file"
    accept="image/*"
    {...register("thumbnail")}
    className="w-full text-gray-300"
  />
</button>
  {errors.thumbnail?.message && (
    <p className="text-red-500 text-sm mt-1">
      {String(errors.thumbnail.message)}
    </p>
  )}

</div>






          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3 bg-[#00BFFF] text-black font-medium rounded-md hover:bg-[#1E90FF] transition-colors disabled:opacity-50"
          >
            {mutation.isPending ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
