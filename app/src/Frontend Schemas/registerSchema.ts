
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Name is a required field!"),

    email: z
      .email("Email must be in a good format!")
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters!"),

    confirmPassword: z.string().min(
      1,
      "Please confirm your password!"
    ),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match!",
      path: ["confirmPassword"],
    }
  );

export default registerSchema;
