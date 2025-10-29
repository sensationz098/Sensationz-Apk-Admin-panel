"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInForm } from "@/schemas/signinSchema";

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
  });

  const signInMutation = useMutation({
    mutationFn: async (data: SignInForm) => {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    },
    onSuccess: () => {
      alert("Signed in successfully!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      alert(error.message || "Sign in failed. Please try again.");
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <form
        onSubmit={handleSubmit((data) => signInMutation.mutate(data))}
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
          <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={signInMutation.isPending}
          className="w-full py-3 bg-[#00BFFF] text-black font-medium rounded-md hover:bg-[#1E90FF] transition-colors disabled:opacity-70"
        >
          {signInMutation.isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
