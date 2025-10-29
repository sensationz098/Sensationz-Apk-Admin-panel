"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpForm } from "@/schemas/signupSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpSchema),
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignUpForm) => {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Signup failed");
      return res.json();
    },
    onSuccess: () => {
      alert("Account created successfully!");
      router.push("/signin");
    },
    onError: () => alert("Signup failed. Please try again."),
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <form
        onSubmit={handleSubmit((data) => signupMutation.mutate(data))}
        className="bg-[#111] border border-[#222] p-8 rounded-2xl w-full max-w-sm shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-[#00BFFF]">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          {...register("name")}
          className="w-full p-3 mb-2 bg-[#181818] border border-[#333] rounded-md text-white"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-3">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-3 mb-2 bg-[#181818] border border-[#333] rounded-md text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-3 mb-2 bg-[#181818] border border-[#333] rounded-md text-white"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full py-3 bg-[#00BFFF] text-black font-medium rounded-md hover:bg-[#1E90FF] transition-colors disabled:opacity-50"
        >
          {signupMutation.isPending ? "Creating..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
