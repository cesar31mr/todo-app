import type { Request, Response } from 'express';

/**
 * Captura cualquier ruta no definida. Se registra después de todas
 * las rutas reales pero antes del errorHandler.
 */
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    error: 'Recurso no encontrado'
  });
}