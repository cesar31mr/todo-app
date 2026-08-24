/**
 * Entidad de dominio. Representa una tarea tal como la entiende
 * el negocio, sin acoplarse a cómo se presiste ni a cómo viaja por HTTP
 */
export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}