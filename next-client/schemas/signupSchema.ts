import { z } from "zod";
import zxcvbn from "zxcvbn";

const commonPasswords = [
  "admin",
  "password",
  "123456",
  "qwerty",
  "abc123",
  "letmein",
  "welcome",
  "monkey",
  "football",
  "dragon",
  "baseball",
  "sunshine",
  "princess",
];

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .refine((value) => !commonPasswords.includes(value.toLowerCase()), {
      message: "Password is too common, please choose a different one",
    })
    .refine((value) => zxcvbn(value).score >= 2, {
      message: "Password is too weak, please choose a stronger one",
    }),
});
