import { ITask } from "../types/TasksTypes";
export interface IFindTaks {
    findTaks(): Promise<ITask[]>;
    findTaksByID(id: any): Promise<ITask | null>;
}
//# sourceMappingURL=FindTaks.d.ts.map