import React, { useState, useEffect } from "react";
import type { ITask } from "../taks";

interface TaskCreateProps {
  onCreateTask: (taskData: Omit<ITask, "id">) => Promise<void>;
  onUpdateTask: (id: string, taskData: Partial<ITask>) => Promise<void>;
  selectedTask: ITask | null;
  loading: boolean;
  onClearSelection: () => void;
}

const TaskCreate: React.FC<TaskCreateProps> = ({
  onCreateTask,
  onUpdateTask,
  selectedTask,
  loading,
  onClearSelection,
}) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState<
    "pendiente" | "en-progreso" | "completada"
  >("pendiente");

  /** Cargar datos al editar */
  useEffect(() => {
    if (selectedTask) {
      setTitulo(selectedTask.titulo);
      setDescripcion(selectedTask.descripcion);
      setEstado(selectedTask.estado as any);
    } else {
      resetForm();
    }
  }, [selectedTask]);

  /** Reset formulario */
  const resetForm = () => {
    setTitulo("");
    setDescripcion("");
    setEstado("pendiente");
  };

  /** Manejar submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      titulo,
      descripcion,
      estado,
    };

    if (selectedTask) {
      await onUpdateTask(selectedTask.id!, taskData);
    } else {
      await onCreateTask(taskData);
    }

    resetForm();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {selectedTask ? "Editar Tarea" : "Crear Nueva Tarea"}
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Revisar inventario"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Detalles de la tarea..."
            style={styles.textarea}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as any)}
            style={styles.select}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en-progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <div style={styles.actions}>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: selectedTask ? "#17a2b8" : "#28a745",
            }}
          >
            {loading
              ? "Guardando..."
              : selectedTask
              ? "Actualizar Tarea"
              : "Crear Tarea"}
          </button>

          {selectedTask && (
            <button
              type="button"
              onClick={() => {
                onClearSelection();
                resetForm();
              }}
              style={{ ...styles.button, backgroundColor: "#6c757d" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

/** 🎨 Estilos inline */
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  heading: {
    marginBottom: "15px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "vertical",
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s ease-in-out",
  },
};

export default TaskCreate;
