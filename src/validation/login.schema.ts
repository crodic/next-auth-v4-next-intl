import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
    code: z.string().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
