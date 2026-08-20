import { db } from "../infrastructure/database/connection.js";
import { runMigrations } from "../infrastructure/database/migrate.js";

runMigrations(db);
console.log('Listo, verifica el archivo sqlite')