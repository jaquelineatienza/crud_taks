import type { ITask } from "../taks";

const API_BASE_URL = 'http://localhost:3000/api'; // 🔹 Reemplaza con tu endpoint real



export const taskService = {
    async createTask(task: Omit<ITask, '_id'>): Promise<ITask> {
        const response = await fetch(`${API_BASE_URL}/createTaks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
        });

        return response
    },

  async getTasks(): Promise<ITask[]> {
    const response = await fetch(`${API_BASE_URL}/allTaks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json(); 
    return data;
  },   

    

    async updateTask(id: string, updates: Partial<ITask>): Promise<ITask> {
        const response = await fetch(`${API_BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
       return response
    },

   async deleteTask(id: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/delete/${id}`, { 
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            },
        });

        // Verificar que la respuesta sea exitosa
        if (response.status === 200 || response.status === 204) {
            console.log('✅ Tarea eliminada exitosamente');
            return true;
        } else {
            console.error('❌ Error del servidor:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error('❌ Error de red:', error);
        return false;
    }
},
};
