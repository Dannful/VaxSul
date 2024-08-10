import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional().nullable(),
  email: z.string(),
  password: z.string(),
  role: z.union([
    z.literal("USER"),
    z.literal("SALES_MANAGER"),
    z.literal("RESEARCH_LEAD"),
    z.literal("RESEARCHER"),
  ]),
  cpf: z.string(),
  phone: z.string(),
  birthday: z.string(),
  name: z.string(),
  laboratoryId: z.number().optional().nullable(),
});

export type User = z.infer<typeof userSchema>;
