import { z } from "zod";

export const PurchaseSchema = z.object({
  id: z.number().optional().nullable(),
  vaccineId: z.number(),
  userId: z.number().optional().nullable(),
  amount: z.number(),
  totalSpent: z.number(),
  timestamp: z.string(),
});

export type Purchase = z.infer<typeof PurchaseSchema>;
