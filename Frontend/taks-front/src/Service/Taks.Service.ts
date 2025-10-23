import type { ITask } from "../taks";

const API_BASE_URL = 'https://tu-backend.com/api'; // 🔹 Reemplaza con tu endpoint real
const TASKS_URL = `${API_BASE_URL}/tasks`;

// Función auxiliar para manejo de errores
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Error ${response.status}: ${message}`);
    }
    return response.json();
}

export const taskService = {
    async createTask(task: Omit<ITask, '_id'>): Promise<ITask> {
        const response = await fetch(TASKS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...task,
                fechaCreacion: new Date().toISOString()
            }),
        });
        return handleResponse<ITask>(response);
    },

    async getTasks(): Promise<ITask[]> {
        const response = await fetch(TASKS_URL);
        const data = await handleResponse<ITask[]>(response);
        return data.map(task => ({
            ...task,
            estado: task.estado || 'pendiente'
        }));
    },


    async getTaskById(id: string): Promise<ITask> {
        const response = await fetch(`${TASKS_URL}/${id}`);
        return handleResponse<ITask>(response);
    },

    async updateTask(id: string, updates: Partial<ITask>): Promise<ITask> {
        const response = await fetch(`${TASKS_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        return handleResponse<ITask>(response);
    },

    async deleteTask(id: string): Promise<boolean> {
        const response = await fetch(`${TASKS_URL}/${id}`, { method: 'DELETE' });
        await handleResponse(response);
        return true;
    },
};
