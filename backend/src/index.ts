import express from "express";
import cors from "cors";
import { env } from './config/env.js';
import { runMigrations } from "./infrastructure/database/migrate.js";
import { db } from "./infrastructure/database/connection.js";
import { corsOptions } from "./config/cors.js";
import { healthRouter } from "./presentation/routes/health.routes.js";
import { notFoundHandler } from "./presentation/middlewares/notFoundHandler.js";
import { errorHandler } from "./presentation/middlewares/errorHandler.js";

function bootstrap(): void {
  runMigrations(db);

  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json({ limit: '10kb' })); // límite de payload, previene abuso básico

  app.use(healthRouter);
  // Fase 4: aquí se montará app.use('/api/tasks', taskRouter);


  // TODA RUTA NUEVA debe ir antes de esto dos
  app.use(notFoundHandler);
  app.use(errorHandler); // SIEMPRE al final

  const port = env.PORT;
  app.listen(port, () =>{
    console.log(`Servidor iniciado y escuchando en http://localhost:${port} (${env.NODE_ENV})`);
  });
}

bootstrap();