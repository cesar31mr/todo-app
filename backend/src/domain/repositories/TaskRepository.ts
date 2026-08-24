import type { Task } from '../entities/Task.js';

/**
 * Contrato que cualquier implementación de persistencia debe cumplir.
 * Application depende de esta interfaz, nunca de SQLite directamente.
 * Esto permite sustituir la implementación (ej. Postgres) sin tocar
 * los use cases, y facilita tests unitarios con un fake in-memory.
 */
export interface TaskRepository {
  findAll(filters: TaskFilters): Task[];
  findById(id: string): Task | null;
  create(task: Task): void;
  update(id: string, changes: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null;
  delete(id: string): boolean;
}

export interface TaskFilters {
  completed?: boolean;
  search?: string;
}

/**
 * Por qué "update" recibe "Partial<Omit<Task, 'id' | 'createdAd'>>": refleja que las
 * ediciones son parciales (PATCH), y explícitamente prohíbe cambiar id o createdAt vía el
 * tipo - no solo por convención, sino que TypeScript lo impide en tiempo de compilación.
 */