import React, { useCallback } from "react";
import type { ITask } from "../taks";

interface TaskListProps {
  tasks: ITask[];
  loading: boolean;
  onCreateTask: () => void; // ⬅ Nuevo
  onEditTask: (task: ITask) => void;
  onDeleteTask: (id: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onCreateTask,
  onEditTask,
  onDeleteTask,
}) => {
  /** 🎨 Mapea el color según el estado de la tarea */
  const getEstadoColor = (estado: string): string => {
    const colors: Record<string, string> = {
      completada: "#28a745",
      "en-progreso": "#ffc107",
      pendiente: "#6c757d",
    };
    return colors[estado] || "#6c757d";
  };

  /** 🏷️ Devuelve el texto legible del estado */
  const getEstadoText = (estado: string): string => {
    const textos: Record<string, string> = {
      completada: "Completada",
      "en-progreso": "En Progreso",
      pendiente: "Pendiente",
    };
    return textos[estado] || estado;
  };

  /** 🕒 Estado de carga */
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p>Cargando tareas...</p>
      </div>
    );
  }

  /** 🧠 Handler para crear tarea */
  const handleCreate = useCallback(() => {
    onCreateTask();
  }, [onCreateTask]);

  /** 📋 Lista principal */
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          Lista de Tareas <span style={styles.counter}>({tasks.length})</span>
        </h2>
        <button
          onClick={handleCreate}
          style={{ ...styles.button, backgroundColor: "#007bff" }}
        >
          + Crear Tarea
        </button>
      </div>

      {tasks.length === 0 ? (
        <p style={styles.emptyText}>No hay tareas creadas</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={{ flex: 1 }}>
                <h3 style={styles.taskTitle}>{task.titulo}</h3>
                <p style={styles.taskDescription}>{task.descripcion}</p>

                <div style={styles.metaContainer}>
                  <span
                    style={{
                      ...styles.estadoBadge,
                      backgroundColor: getEstadoColor(task.estado),
                    }}
                  >
                    {getEstadoText(task.estado)}
                  </span>
                </div>
              </div>

              <div style={styles.actions}>
                <button
                  onClick={() => onEditTask(task)}
                  style={{ ...styles.button, backgroundColor: "#17a2b8" }}
                >
                  Editar
                </button>

                <button
                  onClick={() => task.id && onDeleteTask(task.id)}
                  style={{ ...styles.button, backgroundColor: "#dc3545" }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

/** 🎨 Estilos centralizados */
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  title: {
    color: "#333",
    margin: 0,
  },
  counter: {
    color: "#6c757d",
    fontWeight: "normal",
  },
  loadingContainer: {
    padding: "20px",
    textAlign: "center",
    color: "#6c757d",
  },
  emptyText: {
    textAlign: "center",
    color: "#6c757d",
    fontStyle: "italic",
  },
  card: {
    marginBottom: "15px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    transition: "box-shadow 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  taskTitle: {
    margin: "0 0 8px 0",
    color: "#222",
  },
  taskDescription: {
    margin: "0 0 10px 0",
    color: "#555",
    fontSize: "14px",
  },
  metaContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  estadoBadge: {
    padding: "5px 12px",
    color: "white",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  button: {
    padding: "6px 12px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    transition: "opacity 0.2s ease",
  },
};

export default TaskList;
