import { Task } from "../../domain/entities/Task.js";
import { TaskFilters, TaskRepository } from "../../domain/repositories/TaskRepository.js";

export class ListTasks {
  constructor (private readonly taskRepository: TaskRepository) {}

  execute(filters: TaskFilters): Task[] {
    return this.taskRepository.findAll(filters);
  }
}

/**
 * Este use case es deliberadamente delgado - no hay lógica de negocio adicional en un listado
 * simple. No fuerzo complejidad donde no la hay
 */