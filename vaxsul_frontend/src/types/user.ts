import { z } from "zod";

export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.union([
    z.literal("USER"),
    z.literal("SALES_MANAGER"),
    z.literal("RESEARCH_LEAD"),
    z.literal("RESEARCHER"),
  ]),
  state: z.string(),
  city: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;
