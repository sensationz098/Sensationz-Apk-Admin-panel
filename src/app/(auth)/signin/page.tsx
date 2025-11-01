

"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInForm, SignInSchema } from "@/schemas/signinSchema";



export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  });

  // ✅ React Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignInForm) => {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Invalid credentials");

      document.cookie = `token=${result.token}; path=/; secure; samesite=strict; max-age=${60 * 60 * 24 * 7}`; 

      return result;
    },
    onSuccess: (data) => {
      if (data.role === "ADMIN") router.push("/admin/dashboard");
      else router.push("/teacher/dashboard");
    },
    onError: (error: any) => {
      alert(error.message || "Sign in failed. Please try again.");
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="bg-[#111] border border-[#222] p-8 rounded-2xl w-full max-w-sm shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-[#00BFFF]">
          Sign In
        </h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-3 mb-2 bg-[#181818] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-3 mb-2 bg-[#181818] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#00BFFF]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-[#00BFFF] text-black font-medium rounded-md hover:bg-[#1E90FF] transition-colors disabled:opacity-70"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
