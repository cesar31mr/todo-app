import z from "zod";

const envSchema = z.object({
  DATABASE_PATH: z.string().min(1).default('./data/todo.sqlite'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_ORIGIN: z.string().url().default('http://localhost:5173'),
  PORT: z.coerce.number().int().positive().default(3000),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if(!result.success) {
    // Sin exponer detalle por si tiene info sensible
    console.error('Configuración de entorno inválida:');
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }

  return result.data;
}

/**
 * export const env se evalúa una sola vez al importar el módulo
 * por primera vez; todo el resto de la app importa este mismo objeto
 * ya validado, sin leer process.env en cada lugar
 */
export const env = loadEnv();