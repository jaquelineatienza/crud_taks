import React, { useState, useEffect, useCallback } from "react";
import type { ITask } from "../taks";

interface TaskFormProps {
  onCreateTask: (taskData: Omit<ITask, "id">) => Promise<void>;
  onUpdateTask: (id: any, taskData: Partial<ITask>) => Promise<void>;
  selectedTask: ITask | null;
  loading: boolean;
  onClearSelection: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onCreateTask,
  onUpdateTask,
  selectedTask,
  loading,
  onClearSelection,
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente" as ITask["estado"],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔄 Reset form when selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        titulo: selectedTask.titulo || "",
        descripcion: selectedTask.descripcion || "",
        estado: selectedTask.estado || "pendiente",
      });
    } else {
      setFormData({
        titulo: "",
        descripcion: "",
        estado: "pendiente",
      });
    }
  }, [selectedTask]);

  // 🎯 Handle input changes
  const handleInputChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // 🚀 Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.titulo.trim()) {
        alert("El título es requerido");
        return;
      }

      setIsSubmitting(true);

      try {
        if (selectedTask) {
          // ✏️ Update existing task
          await onUpdateTask(selectedTask.id, formData);
        } else {
          // ➕ Create new task
          await onCreateTask(formData);
        }

        // Clear form after successful submission
        if (!selectedTask) {
          setFormData({
            titulo: "",
            descripcion: "",
            estado: "pendiente",
          });
        }
      } catch (error) {
        console.error("Error submitting task:", error);
        alert("Error al guardar la tarea");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, selectedTask, onCreateTask, onUpdateTask]
  );

  // ❌ Handle cancel edit
  const handleCancel = useCallback(() => {
    onClearSelection();
    setFormData({
      titulo: "",
      descripcion: "",
      estado: "pendiente",
    });
  }, [onClearSelection]);

  // 🎨 Estilos
  const styles = {
    container: {
      padding: "20px",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      backgroundColor: "#fff",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "5px",
    },
    label: {
      fontWeight: "600",
      color: "#555",
      fontSize: "14px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      transition: "border-color 0.2s ease",
    },
    textarea: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      minHeight: "80px",
      resize: "vertical" as const,
      fontFamily: "inherit",
    },
    select: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      backgroundColor: "white",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    submitButton: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      flex: 1,
      opacity: isSubmitting || loading ? 0.6 : 1,
    },
    cancelButton: {
      padding: "10px 20px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    },
    loadingText: {
      textAlign: "center" as const,
      color: "#666",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {selectedTask ? "✏️ Editar Tarea" : "➕ Crear Nueva Tarea"}
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Título *</label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => handleInputChange("titulo", e.target.value)}
            style={styles.input}
            placeholder="Ingresa el título de la tarea"
            disabled={isSubmitting || loading}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Descripción</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => handleInputChange("descripcion", e.target.value)}
            style={styles.textarea}
            placeholder="Describe la tarea (opcional)"
            disabled={isSubmitting || loading}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Estado</label>
          <select
            value={formData.estado}
            onChange={(e) => handleInputChange("estado", e.target.value)}
            style={styles.select}
            disabled={isSubmitting || loading}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en-progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        {(isSubmitting || loading) && (
          <div style={styles.loadingText}>
            {isSubmitting ? "Guardando..." : "Cargando..."}
          </div>
        )}

        <div style={styles.buttonGroup}>
          <button
            type="submit"
            style={styles.submitButton}
            disabled={isSubmitting || loading || !formData.titulo.trim()}
          >
            {selectedTask ? "Actualizar Tarea" : "Crear Tarea"}
          </button>

          {selectedTask && (
            <button
              type="button"
              onClick={handleCancel}
              style={styles.cancelButton}
              disabled={isSubmitting || loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
