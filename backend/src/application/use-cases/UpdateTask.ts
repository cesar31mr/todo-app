import { Task } from "../../domain/entities/Task.js";
import { AppError } from "../../domain/errors/AppError.js";
import { TaskRepository } from "../../domain/repositories/TaskRepository.js";

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  completed?: boolean;
}

export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  execute(id: string, input: UpdateTaskInput): Task {
    if (input.title !== undefined) {
      const trimmed = input.title.trim();
      if (trimmed.length === 0){
        throw new AppError('El título no puede estar vacío', 400);
      }
      if (trimmed.length > 200) {
        throw new AppError('El título no puede superar 200 caracteres', 400);
      }
      input.title = trimmed;
    }

    const updated = this.taskRepository.update(id, input);
    if (!updated) {
      throw new AppError('Tarea no encontrada', 404);
    }
    return updated;
  }
}

/**
 * Nota: este use case cubre tanto "editar título/descripción" como "marcar como completada"
 * (completed: true/false es solo un campo más del PATCH) - decisión ya justificada en el
 * diseño de API original, evita un endpoint/use case duplicado solo para el toggle.
 */