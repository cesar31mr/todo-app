import type { NextFunction, Request, Response } from 'express';

/**
 * Error de dominio/aplicación con código HTTP asociado.
 * Los use cases lanzarán este tipo de error (o subtipos) en vez de
 * errores genéricos, para que el handler sepa qué status devolver.
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = 'AppError';
  }
}

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