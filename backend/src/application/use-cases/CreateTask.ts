import { randomUUID } from "node:crypto";
import { Task } from "../../domain/entities/Task.js";
import { TaskRepository } from "../../domain/repositories/TaskRepository.js";
import { AppError } from "../../domain/errors/AppError.js";

export interface CreateTaskInput {
  title: string;
  description?: string | null;
}

/**
 * Caso de uso: crear una tarea nueva.
 * Recibe el repository por constructor (inyección de dependencia),
 * nunca lo instancia - así el use case es testeable con un fake.
 */
export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  execute(input: CreateTaskInput): Task {
    const title = input.title.trim();

    if(title.length === 0){
      throw new AppError('El título no puede estar vacío', 400);
    }
    if(title.length > 200){
      throw new AppError('El título no puede superar los 200 caracteres', 400);
    }

    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      title,
      description: input.description?.trim() || null,
      completed: false,
      createdAt: now,
      updatedAt: now
    }

    this.taskRepository.create(task);
    return task;
  }
}

/**
 * Nota importante sobre validación duplicada: aquí valido longitud de title como regla de 
 * negocio (invariante del dominio: una tarea siempre tiene título válido, sin importar quién la
 * cree). Zod, en la capa de presentación (Fase 5), validará forma y tipos de la petición HTTP (que
 * title exista, sea string, etc.) antes de que esto se ejecute. No es duplicación redundante: son
 * dos responsabilidades distintas - Zod valida el shape del request, el use case protege el
 * invariante del dominio incluso si en el futuro hay otro entrypoint (ej. un CLI) que no pase por Zod.
 * 
 * Por qué un randomUUID() de node:crypto y no una librería externa: Node lo trae nativo desde
 * hace varias versiones, cumple RFC 4122, cero dependencias adicionales - coherente con el
 * criterio de no agregar paquetes innecesarios.
 */