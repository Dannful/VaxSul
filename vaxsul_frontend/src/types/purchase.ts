import { z } from "zod";

export const PurchaseSchema = z.object({
  vaccineId: z.number(),
  userId: z.number(),
  amount: z.number(),
  totalSpent: z.number(),
  timestamp: z.string(),
});

export type Purchase = z.infer<typeof PurchaseSchema>;
