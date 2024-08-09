import { z } from "zod";

export const ResearchSchema = z.object({
    id: z.number(),
    startDate: z.string(),
    status: z.union([
        z.literal("IN_PROGRESS"),
        z.literal("PAUSED"),
        z.literal("COMPLETED"),
        z.literal("DROPPED"),
      ]),
});


export type Research = z.infer<typeof ResearchSchema>;
