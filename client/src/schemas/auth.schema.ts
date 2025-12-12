// src/schemas/auth.schema.ts
import { z } from "zod/v4";

export const signinSchema = z.object({
      email: z.email({
      error: (issue) => {
        if (!issue.input || issue.input === "") return "Email is required";
        return "Invalid email address";
      },
    }),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email({
      error: (issue) => {
        if (!issue.input || issue.input === "") return "Email is required";
        return "Invalid email address";
      },
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SigninInput = z.infer<typeof signinSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
