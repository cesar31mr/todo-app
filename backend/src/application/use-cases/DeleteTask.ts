import { AppError } from "../../domain/errors/AppError.js";
import { TaskRepository } from "../../domain/repositories/TaskRepository.js";

export class DeleteTask {
  constructor(private readonly taskRespository: TaskRepository) {}

  execute(id: string): void {
    const deleted = this.taskRespository.delete(id);
    if(!deleted){
      throw new AppError('Tarea no encontrada', 404);
    }
  }
}