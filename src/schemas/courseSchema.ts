import { z } from "zod";

export const CourseSchema = z.object({
  name: z.string().min(2, "Course name required"),
  teacher: z.string().min(1, "Teacher is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  mrp: z.number().min(1, "MRP required"),
  discount: z.number().min(0).max(100),
  duration: z.number().min(1, "Duration required"),
  thumbnail: z
    .custom<FileList>()
    .refine((files) => files && files.length === 1, "Thumbnail required"),
});

export type CourseForm = z.infer<typeof CourseSchema>;
