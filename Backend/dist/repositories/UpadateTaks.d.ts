import { ITask } from "../types/TasksTypes";
export interface IUpdateTaks {
    updateTaks(id: any, taks: Partial<ITask>): Promise<ITask | null>;
}
//# sourceMappingURL=UpadateTaks.d.ts.map