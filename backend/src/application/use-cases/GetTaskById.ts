import { Task } from "../../domain/entities/Task.js";
import { AppError } from "../../domain/errors/AppError.js";
import { TaskRepository } from "../../domain/repositories/TaskRepository.js";

export class GetTaskById {
  constructor (private readonly taskRepository: TaskRepository) {}

  execute(id: string): Task {
    const task = this.taskRepository.findById(id);
    if (!task){
      throw new AppError('Tarea no encontrada', 404);
    }
    return task;
  }
}