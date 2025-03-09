import { LoginFormData } from "@/components/auth/Login";
import { SignupFormData } from "@/components/auth/Signup";
import { z, ZodType } from "zod";

export const signupSchema: ZodType<SignupFormData> = z.object({
  firstName: z.string().min(1, "first name is required"),
  lastName: z.string().min(1, "last name is required"),
  email: z.string().min(1, "email is required").email("input must be email"),
  password: z.string().min(8, "password should be min of 8 chararacters"),
  confirm: z.string().min(8, "password should be min of 8 chararacters"),
});

export const loginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().min(1, "email is required").email("input must be email"),
  password: z.string().min(8, "password should be min of 8 chararacters"),
});
