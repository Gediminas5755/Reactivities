import {z} from 'zod';

export const activitySchema = z.object({
    title: z.string({error: "Title is required"}).min(1, {error: "Title is required"}).max(100),
    description: z.string().min(1).max(500),
    category: z.string().min(1).max(100),
    date: z.string().min(1).max(100),
    city: z.string().min(1).max(100),
    venue: z.string().min(1).max(100)
});

export type ActivitySchema = z.infer<typeof activitySchema>;