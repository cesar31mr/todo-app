import type { CorsOptions } from 'cors';
import { env } from './env.js';

/**
 * Whitelist explícita de origen. Nunca usar '*' cuando en el futuro
 * se incorpore autenticación basada en cookies/sesión.
 */
export const corsOptions: CorsOptions = {
  origin: env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
};