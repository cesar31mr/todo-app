import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { env } from "../../config/env.js";

/**
 * Conexión única (singleton) a SQLite para toda la aplicación
 * better-sqlite3 es síncrono: no necesitamos pool de conexiones
 */
function createConection(): Database.Database {
  const dbPath = resolve(env.DATABASE_PATH);
  console.log(`dbPath: ${dbPath}`)

  // Aseguramos que el directorio contenedor exista
  // antes de que better-sqlite3 intente crear el archivo.
  mkdirSync(dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);

  // Buena práctica: aunque hoy solo hay una tabla, dejamos
  // integridad referencial activada por defecto para el futuro
  db.pragma('foreign_keys = ON');

  return db;
}

export const db = createConection();