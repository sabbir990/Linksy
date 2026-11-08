import { z } from "zod";

const MIN_AGE = 13;

const registerSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, "Display name must be at least 2 characters")
      .max(50, "Display name must be 50 characters or fewer"),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be 20 characters or fewer")
      .regex(
        /^[a-z0-9_]+$/,
        "Use only lowercase letters, numbers and underscores"
      ),
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    // <input type="date"> gives a "YYYY-MM-DD" string. It is converted to a Date on submit.
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required")
      .refine((value) => !Number.isNaN(new Date(value).getTime()), "Enter a valid date")
      .refine((value) => new Date(value) <= new Date(), "Date of birth can't be in the future")
      .refine((value) => {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - MIN_AGE);
        return new Date(value) <= cutoff;
      }, `You must be at least ${MIN_AGE} years old`),
    country: z.string().trim().min(2, "Country is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Za-z]/, "Password must include a letter")
      .regex(/\d/, "Password must include a number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default registerSchema;