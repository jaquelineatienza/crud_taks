import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ITask } from "../taks";
import { taskService } from "../Service/Taks.Service";

const UpdateTaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    setLoading(true);
    try {
      const tasks = await taskService.getTasks();

      const task = tasks.find((t: ITask) => t.id === id);

      if (task) {
        setFormData({
          titulo: task.titulo,
          descripcion: task.descripcion,
          estado: task.estado,
        });
      } else {
        console.log("❌ No se encontró la tarea con ID:", id);
        setMessage("❌ Tarea no encontrada");
      }
    } catch (error) {
      console.error("❌ Error cargando tarea:", error);
      setMessage("❌ Error al cargar la tarea");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const taskData: Omit<ITask, "id"> = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        estado: formData.estado,
      };

      if (id) {
        await taskService.updateTask(id, taskData);
        setMessage("✅ Tarea actualizada exitosamente!");
      } else {
        await taskService.createTask(taskData);
        setMessage("✅ Tarea creada exitosamente!");
      }

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error al guardar la tarea");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Cargando tarea...</div>;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-xl border-2 border-purple-300 rounded-lg p-6 bg-white shadow-md">
        <h1 className="font-bold text-purple-900 text-[26px] mb-4">
          Editar Tarea
        </h1>

        {message && (
          <div
            className={`p-3 my-2 border rounded ${
              message.includes("✅")
                ? "bg-purple-100 border-purple-300"
                : "bg-purple-100 border-purple-300"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-2.5 flex flex-col gap-2">
            <label htmlFor="titulo" className="font-bold text-purple-900">
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border-2 border-gray-500 rounded px-2 py-1"
            />
          </div>

          <div className="mb-2.5 flex flex-col gap-2">
            <label htmlFor="descripcion" className="font-bold text-purple-900">
              Descripción:
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={4}
              value={formData.descripcion}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border-2 border-gray-500 rounded px-2 py-1"
            ></textarea>
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="estado" className="font-bold text-purple-900">
              Estado:
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border-2 border-gray-500 rounded px-1 py-1 text-white bg-purple-900"
            >
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-[3px] p-3 bg-purple-900 text-white flex-1"
            >
              {loading ? "Actualizando..." : "Actualizar Tarea"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-4 py-2 bg-purple-900 hover:bg-red-700 disabled:bg-red-400 text-white rounded flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskForm;
