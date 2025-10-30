import { IUpdateTaks } from "../repositories/UpadateTaks";
import { ITask } from "../types/TasksTypes";
export declare class UpdateTaksService implements IUpdateTaks {
    private readonly updateTaksService;
    constructor(updateTaksService: IUpdateTaks);
    updateTaks(id: any, taks: Partial<ITask>): Promise<ITask | null>;
}
//# sourceMappingURL=updateEquipo.Service.d.ts.map