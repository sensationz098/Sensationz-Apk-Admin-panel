import { z } from "zod";

export const teacherSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export type TeacherFormData = z.infer<typeof teacherSchema>;
