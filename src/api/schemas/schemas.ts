import { z } from 'zod';

export const tokenStoreSchema = z.object({
  expirationTime: z.number(),
  refreshToken: z.string().optional(),
  token: z.string(),
});
