"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TeacherFormData, teacherSchema } from "@/schemas/teacherSchema";

export default function CreateTeacherModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: TeacherFormData) => {
      const res = await fetch("/api/admin/create-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.error) setMessage(data.error);
      else {
        setMessage("✅ Teacher created successfully");
        reset();
        setTimeout(onClose, 1200);
      }
    },
  });

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
    >
      <div className="bg-[#111] border border-[#222] p-8 rounded-2xl w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-[#00BFFF]">
          Add New Teacher
        </h2>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          {/* Name */}
          <input
            {...register("name")}
            placeholder="Teacher Name"
            className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white focus:ring-1 focus:ring-[#00BFFF]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white focus:ring-1 focus:ring-[#00BFFF]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-3 bg-[#181818] border border-[#333] rounded-md text-white focus:ring-1 focus:ring-[#00BFFF]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {message && (
            <p className="text-sm text-center text-green-400 mt-3">{message}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-600 text-gray-300 hover:bg-[#181818]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-5 py-2 text-sm font-medium bg-[#00BFFF] hover:bg-[#1E90FF] text-black rounded-md transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? "Saving..." : "Add Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
