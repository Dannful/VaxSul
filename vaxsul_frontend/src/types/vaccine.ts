import { z } from "zod";

export const VaccineSchema = z.object({
  id: z.number(),
  dose: z.number(),
  pricePerUnit: z.number(),
  amountInStock: z.number(),
  researchId: z.number().optional().nullable(),
  sellable: z.boolean(),
  name: z.string(),
  laboratoryId: z.number(),
  description: z.string(),
});

export const VaccineSearchSchema = z.object({
  minimumPrice: z.number().optional(),
  maximumPrice: z.number().optional(),
  name: z.string().optional(),
  count: z.number().optional(),
});

export const VaccineSearchResponseSchema = z.object({
  first: z.number(),
  second: VaccineSchema.array(),
});

export type Vaccine = z.infer<typeof VaccineSchema>;
export type VaccineSearch = z.infer<typeof VaccineSearchSchema>;
export type VaccineSearchResponse = z.infer<typeof VaccineSearchResponseSchema>;
