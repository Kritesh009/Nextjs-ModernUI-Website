import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Name is required"),

  email: z
    .string()
    .email("Invalid email"),
phone: z
  .string()
  .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  company: z
    .string()
    .min(2, "Company name required"),

  subject: z
    .string()
    .min(3, "Subject required"),

  budget: z
    .string()
    .min(1, "Select budget"),

  projectType: z
    .string()
    .min(1, "Select project type"),
timeline: z
  .string()
  .min(1, "Select timeline"),
  message: z
    .string()
    .min(10, "Message too short"),

  terms: z.boolean().refine(
    (value) => value === true,
    {
      message: "Accept terms required",
    }
  ),
});

export type ContactFormData = z.infer<
  typeof contactSchema
>;