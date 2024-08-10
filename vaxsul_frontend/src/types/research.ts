import { z } from "zod";

export const ResearchSchema = z.object({
    id: z.number().optional().nullable(),
    startDate: z.string(),
    status: z.union([
        z.literal("IN_PROGRESS"),
        z.literal("PAUSED"),
        z.literal("COMPLETED"),
        z.literal("DROPPED"),
      ]),
    progress: z.number().optional(),
});


export type Research = z.infer<typeof ResearchSchema>;
