import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Database } from "better-sqlite3";
import { readdirSync, readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, 'migrations');

/**
 * Ejecuta en orden alfabético, todos los archivos .sql de /migrations.
 * Cada archivo debe ser idempotente (usar IF NOT EXISTS), ya que
 * este runner no lleva registro de qué migraciones ya se aplicaron.
 * Si el proyecto crece a múltiples migraciones dependientes entre sí,
 * se debería introducir una tabla de control de versiones.
 */
export function runMigrations(db: Database): void {
  const files = readdirSync(MIGRATIONS_DIR)
  .filter((file) => file.endsWith('.sql'))
  .sort();

  for (const file of files){
    const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf-8');
    db.exec(sql);
    console.log(`Migración aplicada: ${file}`);
  }
}