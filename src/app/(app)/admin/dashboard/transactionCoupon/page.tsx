"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type CouponFormData = {
  code: string;
  discount: number;
  expiryDate: string;
};

export default function TransactionCouponForm() {
  const queryClient = useQueryClient();
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CouponFormData>({
    defaultValues: {
      code: "",
      discount: 0,
      expiryDate: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CouponFormData) => {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add coupon");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 2000);
    },
  });

  const onSubmit = (data: CouponFormData) => mutation.mutate(data);

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Coupon Code</label>
          <input
            {...register("code", { required: "Code is required" })}
            className="w-full p-2 rounded-md bg-[#181818] border border-[#333] text-white"
            placeholder="e.g. SAVE20"
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Discount (%)</label>
          <input
            type="number"
            {...register("discount", {
              required: "Discount is required",
              min: { value: 1, message: "Minimum 1%" },
              max: { value: 100, message: "Maximum 100%" },
            })}
            className="w-full p-2 rounded-md bg-[#181818] border border-[#333] text-white"
            placeholder="e.g. 20"
          />
          {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Expiry Date</label>
          <input
            type="date"
            {...register("expiryDate", { required: "Expiry date is required" })}
            className="w-full p-2 rounded-md bg-[#181818] border border-[#333] text-white"
          />
          {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-[#00BFFF] text-white rounded-md hover:opacity-80"
        >
          {mutation.isPending ? "Adding..." : "Add Coupon"}
        </button>

        {success && <p className="text-green-500 text-sm mt-2">Coupon added successfully.</p>}
      </form>
    </div>
  );
}
