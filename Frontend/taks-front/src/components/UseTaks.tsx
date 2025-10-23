import { useState, useCallback } from "react";
import type { ITask } from "../taks";
import { taskService } from "../Service/Taks.Service";

export const useTask = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** 🔹 Helper para manejar errores y carga */
  const handleAsync = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T | null> => {
      setLoading(true);
      setError(null);
      try {
        return await fn();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error desconocido";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /** 🟢 CREATE - Crear nueva tarea */
  const createTask = useCallback(
    async (taskData: Omit<ITask, "_id">): Promise<ITask | null> => {
      return handleAsync(async () => {
        const newTask = await taskService.createTask(taskData);
        setTasks((prev) => [...prev, newTask]);
        return newTask;
      });
    },
    [handleAsync]
  );

  /** 🔵 READ - Obtener todas las tareas */
  const fetchTasks = useCallback(async (): Promise<void> => {
    await handleAsync(async () => {
      const data = await taskService.getTasks();
      setTasks(data);
    });
  }, [handleAsync]);

  /** 🟣 READ - Obtener una tarea por ID */
  const fetchTaskById = useCallback(
    async (id: string): Promise<void> => {
      await handleAsync(async () => {
        const task = await taskService.getTaskById(id);
        setSelectedTask(task);
      });
    },
    [handleAsync]
  );

  /** 🟠 UPDATE - Actualizar tarea */
  const updateTask = useCallback(
    async (id: string, updates: Partial<ITask>): Promise<boolean> => {
      const result = await handleAsync(async () => {
        const updated = await taskService.updateTask(id, updates);

        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
        );

        if (selectedTask?.id === id) {
          setSelectedTask((prev) => (prev ? { ...prev, ...updated } : null));
        }

        return true;
      });
      return Boolean(result);
    },
    [handleAsync, selectedTask]
  );

  /** 🔴 DELETE - Eliminar tarea */
  const deleteTask = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await handleAsync(async () => {
        const success = await taskService.deleteTask(id);
        if (success) {
          setTasks((prev) => prev.filter((t) => t.id !== id));
          if (selectedTask?.id === id) setSelectedTask(null);
        }
        return success;
      });
      return Boolean(result);
    },
    [handleAsync, selectedTask]
  );

  /** 🧹 Utilidades */
  const clearError = useCallback(() => setError(null), []);
  const selectTask = useCallback((task: ITask) => setSelectedTask(task), []);
  const clearSelection = useCallback(() => setSelectedTask(null), []);

  return {
    // Estados
    tasks,
    selectedTask,
    loading,
    error,

    // Acciones CRUD
    createTask,
    fetchTasks,
    fetchTaskById,
    updateTask,
    deleteTask,

    // Utilidades
    selectTask,
    clearSelection,
    clearError,
  };
};
