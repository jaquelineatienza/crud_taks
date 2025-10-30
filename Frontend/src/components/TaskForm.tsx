import React, { useState } from "react";
import type { ITask } from "../taks";
import { taskService } from "../Service/Taks.Service"; // Asegúrate de importar el servicio

const TaksForm: React.FC = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Crear el objeto task omitiendo _id (como requiere la función)
      const taskData: Omit<ITask, '_id'> = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        estado: formData.estado
      };

      console.log("Enviando datos:", taskData);
      
      // Llamar al servicio para crear la tarea
      const response = await taskService.createTask(taskData);
      
      if (response) {
        setMessage("✅ Tarea creada exitosamente!");
        // Limpiar el formulario
        setFormData({
          titulo: "",
          descripcion: "",
          estado: "pendiente"
        });
      } else {
        setMessage("❌ Error al crear la tarea");
      }
      
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className="border-2 border-purple-300 rounded-lg p-6 bg-white shadow-md mt-[60px]">                
          <h1 className="font-bold text-purple-900 text-[26px]">Crear Nueva Tarea</h1>
                          
                          {message && (
              
                  <div
              className={`p-3 my-2 border rounded ${
                message.includes("✅")
                  ? "bg-purple-100  border-purple-300"
                  : "bg-purple-100  border-purple-300"
              }`}
                >
            {message}
          </div>
      )}
    
      
      <form onSubmit={handleSubmit} >
        <div className="mb-2,5 flex flex-col gap-2">
          <label htmlFor="titulo"className="font-bold text-purple-900">Título:</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            value={formData.titulo}
            onChange={handleChange}
            required
            disabled={loading}
             className="w-[40%] border-2 border-gray-500"
          />
        </div>
        <div className="mb-2,5">
          <label htmlFor="descripcion" className="font-bold text-purple-900">Descripción:</label>
          <textarea 
            id="descripcion" 
            name="descripcion" 
            rows={4}
            value={formData.descripcion}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border-2 border-gray-500"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2 mb-[15px]">
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
            className="w-[40%] border-2 border-gray-500 rounded text-white bg-purple-900"
          >
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
       className="rounded-[3px] p-3 bg-purple-900 text-white "
        >
          {loading ? "Creando..." : "Crear Tarea"}
        </button>
      </form>
     
    </div>
  );
}

export default TaksForm;