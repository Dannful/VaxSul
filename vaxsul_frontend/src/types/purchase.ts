import { z } from "zod";

export const PurchaseSchema = z.object({
    vaccineId: z.number(),
    userId: z.number(),
    amount: z.number(),
    totalSpent: z.boolean(),
});

export const PurchaseSearchSchema = z.object({
    vaccineId: z.number().optional(),
    userId: z.number().optional(),
});

export type Purchase = z.infer<typeof PurchaseSchema>;
export type PurchaseSearch = z.infer<typeof PurchaseSearchSchema>;
