import { z } from "zod";

export const userSchema = z.object({
  firstName: z.preprocess(
    (val) => val ?? "",
    z.string().min(3, "First name must be at least 3 characters")
  ),

  lastName: z.preprocess(
    (val) => val ?? "",
    z.string().min(3, "Last name must be at least 3 characters")
  ),

  email: z.preprocess(
    (val) => val ?? "",
    z.email("Invalid email format")
  ),

  age: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number().min(18, "Must be 18 or above").optional()
  ),

  address: z.string().optional(),
});


export type UserFormValues = z.infer<typeof userSchema>;