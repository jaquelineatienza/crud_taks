import React, { useEffect, useCallback } from "react";
import TaskForm from "./components/TaskForm";

import { useTask } from "./components/UseTaks";
import type { ITask } from "./taks";
import TaskList from "./components/TaksList";

function App() {
  const {
    tasks,
    selectedTask,
    loading,
    error,
    createTask,
    fetchTasks,
    updateTask,
    deleteTask,
    selectTask,
    clearSelection,
    clearError,
  } = useTask();

  /** 🔄 Cargar tareas al montar */
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /** ➕ Crear tarea */
  const handleCreateTask = useCallback(
    async (taskData: Omit<ITask, "id">) => {
      const result = await createTask(taskData);
      if (result) console.log("✅ Tarea creada:", result);
    },
    [createTask]
  );

  /** ✏️ Actualizar tarea */
  const handleUpdateTask = useCallback(
    async (id: any, taskData: Partial<ITask>) => {
      const success = await updateTask(id, taskData);
      if (success) {
        console.log("✏️ Tarea actualizada:", id);
        clearSelection();
      }
    },
    [updateTask, clearSelection]
  );

  /** 🗑️ Eliminar tarea */
  const handleDeleteTask = useCallback(
    async (id: any) => {
      if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
        const success = await deleteTask(id);
        if (success) console.log("🗑️ Tarea eliminada:", id);
      }
    },
    [deleteTask]
  );

  /** 🧭 Editar tarea seleccionada */
  const handleEditTask = useCallback(
    (task: ITask) => {
      selectTask(task);
    },
    [selectTask]
  );

  /** ➕ Crear nueva tarea (para el botón del TaskList - SIN parámetros) */
  const handleCreateNewTask = useCallback(() => {
    clearSelection(); // Limpiar selección para crear nueva
  }, [clearSelection]);

  return (
    <div className="App" style={styles.appContainer}>
      {/* 🔹 Encabezado */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Gestor de Tareas CRUD</h1>
          <p style={styles.subtitle}>Create • Read • Update • Delete</p>

          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠️</span>
              <div style={styles.errorContent}>
                <strong>Error:</strong> {error}
              </div>
              <button
                onClick={clearError}
                style={styles.errorCloseBtn}
                aria-label="Cerrar error"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 🔹 Contenido principal */}
      <main style={styles.main}>
        <section style={styles.column}>
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>
              {selectedTask ? "✏️ Editar Tarea" : "➕ Crear Nueva Tarea"}
            </h2>
            <TaskForm
              onCreateTask={handleCreateTask}
              onUpdateTask={handleUpdateTask}
              selectedTask={selectedTask}
              loading={loading}
              onClearSelection={clearSelection}
            />
          </div>
        </section>

        <section style={styles.column}>
          <div style={styles.listSection}>
            <TaskList
              tasks={tasks}
              loading={loading}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onCreateTask={handleCreateNewTask}
            />
          </div>
        </section>
      </main>

      {/* 🔹 Pie de página */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            Total de tareas:{" "}
            <strong style={styles.taskCount}>{tasks.length}</strong> |{" "}
            <span style={selectedTask ? styles.editing : styles.creating}>
              {selectedTask
                ? "✏️ Editando tarea"
                : "🆕 Listo para crear nueva tarea"}
            </span>
          </p>
          {selectedTask && (
            <button
              onClick={clearSelection}
              style={styles.cancelEditBtn}
              title="Cancelar edición"
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

/** 🎨 Estilos centralizados */
const styles = {
  appContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  } as React.CSSProperties,

  header: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "20px 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  } as React.CSSProperties,

  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    textAlign: "center",
  } as React.CSSProperties,

  title: {
    margin: 0,
    fontSize: "2.5rem",
    fontWeight: 300,
    color: "white",
  } as React.CSSProperties,

  subtitle: {
    margin: "8px 0 0 0",
    color: "#ecf0f1",
    fontSize: "1.1rem",
    opacity: 0.9,
  } as React.CSSProperties,

  errorBox: {
    display: "flex",
    alignItems: "center",
    color: "#721c24",
    backgroundColor: "#f8d7da",
    padding: "12px 16px",
    margin: "20px auto 0",
    border: "1px solid #f5c6cb",
    borderRadius: "8px",
    maxWidth: "600px",
    position: "relative",
  } as React.CSSProperties,

  errorIcon: {
    marginRight: "10px",
    fontSize: "18px",
  } as React.CSSProperties,

  errorContent: {
    flex: 1,
  } as React.CSSProperties,

  errorCloseBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#721c24",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,

  main: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    padding: "30px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    flex: 1,
    alignItems: "flex-start",
  } as React.CSSProperties,

  column: {
    flex: 1,
    minWidth: "350px",
  } as React.CSSProperties,

  formSection: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    height: "fit-content",
  } as React.CSSProperties,

  listSection: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  } as React.CSSProperties,

  sectionTitle: {
    margin: "0 0 20px 0",
    color: "#2c3e50",
    fontSize: "1.5rem",
    fontWeight: 600,
  } as React.CSSProperties,

  footer: {
    backgroundColor: "#34495e",
    color: "white",
    padding: "15px 0",
    marginTop: "auto",
  } as React.CSSProperties,

  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap" as "wrap",
    gap: "10px",
  } as React.CSSProperties,

  footerText: {
    margin: 0,
    color: "#ecf0f1",
  } as React.CSSProperties,

  taskCount: {
    color: "#3498db",
  } as React.CSSProperties,

  editing: {
    color: "#e74c3c",
    fontWeight: 600,
  } as React.CSSProperties,

  creating: {
    color: "#2ecc71",
    fontWeight: 600,
  } as React.CSSProperties,

  cancelEditBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#e74c3c",
    border: "1px solid #e74c3c",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
  } as React.CSSProperties,
};

export default App;
