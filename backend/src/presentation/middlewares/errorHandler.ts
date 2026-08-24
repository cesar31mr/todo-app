import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../domain/errors/AppError.js';

/**
 * Middleware de manejo de errores centralizado.
 * DEBE registrarse al final de todos los middlewares/rutas en index.ts
 * (Express lo reconoce como error handler por tener 4 parámetros).
 * 
 * Nunca expone: stack traces, mensajes de SQLite, rutas internas.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Error no controlado: lo registramos completo en los logs internos
  // (consola por ahora; luego en logging estructurado),
  // pero al cliente solo devolvemos un mensaje genérico.
  console.error('Error no controlado: ', err);
  res.status(500).json({
    error: 'Error interno.'
  });
}