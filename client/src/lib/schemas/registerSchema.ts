import z from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    email: z.email({ error: 'Invalid email address' }),
    displayName: requiredString('displayName'),
    password: requiredString('password')
});

export type RegisterSchema = z.infer<typeof registerSchema>; 