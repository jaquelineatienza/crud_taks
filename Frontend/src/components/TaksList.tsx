import { taskService } from "../Service/Taks.Service"
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import TaskForm from "./TaskForm";
import type { ITask } from "../task";
import { useState, useEffect } from "react";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleEdit = (taskId: string) => {
    navigate(`/UpdateTask/${taskId}`);
  };

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      return;
    }

    setDeletingId(taskId);
    
    try {
      const success = await taskService.deleteTask(taskId);
      
      if (success) {
        setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId));
      } else {
        alert('❌ Error al eliminar la tarea');
      }
    } catch (error) {
      console.error('❌ Error eliminando tarea:', error);
      alert('❌ Error de conexión al eliminar la tarea');
    } finally {
      setDeletingId(null);
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getTasks();
      setTasks(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("❌ Error al cargar tareas:", error);
      setError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  }; 
  
  useEffect(() => {
    loadTasks();
  }, []);
  
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-64">
          <div>Cargando tareas...</div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-4">
        <div>
          <TaskForm />
        </div>
        <div>
          <h1 className="text-3xl text-purple-900 font-bold text-center mb-6">
            Lista de tareas
          </h1>
          <div className="space-y-4">
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <div 
                  key={task._id} 
                  className="rounded-lg p-4 border-2 border-gray-300 bg-white shadow-sm"
                >
                  <div className="flex flex-row gap-2 text-purple-900 mb-2">
                    <h3 className="font-bold">Título:</h3>
                    <p>{task.titulo}</p>
                  </div>
                  <div className="flex flex-row gap-2 text-purple-900 mb-2">
                    <h3 className="font-bold">Descripción:</h3>
                    <p>{task.descripcion}</p>
                  </div>
                  <div className="flex flex-row gap-2 text-purple-900 mb-4">
                    <h3 className="font-bold">Estado:</h3>
                    <p className={`font-bold ${
                      task.estado === 'completado'
                        ? 'text-green-600 line-through'
                        : 'text-purple-800'
                    }`}>
                      {task.estado}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(task._id!)}
                      className="px-4 py-2 bg-[#47196e] hover:bg-purple-800 text-white rounded cursor-pointer transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(task._id!)}
                      disabled={deletingId === task._id}
                      className="px-4 py-2 bg-purple-900 hover:bg-purple-700 disabled:bg-red-400 text-white rounded cursor-pointer transition-colors"
                    >
                      {deletingId === task._id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No hay tareas disponibles
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskList;