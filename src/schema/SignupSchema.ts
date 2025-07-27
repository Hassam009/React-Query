import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, "Name is required").max(30),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  age: z.coerce.number().min(1, "Age is required"),
  password: z.string().min(6, "Password must be at least 6 characters").max(10),
  confirmPassword: z.string().min(1, "Confirm your password"),
  website: z.string().url("Invalid URL").optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupSchemaType = z.infer<typeof SignupSchema>;