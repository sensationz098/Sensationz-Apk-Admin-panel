import z from "zod";


export const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export type SignInForm = z.infer<typeof SignInSchema>;