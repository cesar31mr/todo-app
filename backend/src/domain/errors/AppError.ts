/**
 * Error de negocio/aplicación con código HTTP asociado.
 * Vive en domain/ porque nace donde se lanza (use cases, entidades),
 * no donde se traduce a respuesta HTTP (presentation/).
 * Domain no conoce Express; este error es solo un dato (mensaje + código),
 * la traducción a JSON/HTTP ocurre exclusivamente en errorHandler.ts.
 */
export class AppError extends Error {
  constructor(message: string, public readonly statusCode: number = 400) {
    super(message);
    this.name = 'AppError'
  }
}