import { z } from 'zod';

export const tokenStoreSchema = z.object({
  expirationTime: z.string(),
  refreshToken: z.string().optional(),
  token: z.number(),
});

export const refreshTokenSchema = z.string();
