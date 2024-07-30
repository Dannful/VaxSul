import { z } from "zod";

export const VaccineSchema = z.object({
  id: z.number(),
  dose: z.number(),
  pricePerUnit: z.number(),
  amountInStock: z.number(),
  researchId: z.number().optional(),
  sellable: z.boolean(),
  name: z.string(),
  description: z.string(),
});

export const VaccineSearchSchema = z.object({
  minimumPrice: z.number().optional(),
  maximumPrice: z.number().optional(),
  name: z.string().optional(),
});

export type Vaccine = z.infer<typeof VaccineSchema>;
export type VaccineSearch = z.infer<typeof VaccineSearchSchema>;
