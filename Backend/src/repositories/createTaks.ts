import { ITask } from "../types/TasksTypes";



export interface ICreateTaks {
    createTaks(taks: ITask): Promise<ITask>
}