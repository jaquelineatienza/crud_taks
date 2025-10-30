import { ICreateTaks } from "../repositories/createTaks";
import { ITask } from "../types/TasksTypes";
export declare class CreateTaksService implements ICreateTaks {
    private readonly createTaksRepo;
    constructor(createTaksRepo: ICreateTaks);
    createTaks(taks: ITask): Promise<ITask>;
}
//# sourceMappingURL=createTaks.Service.d.ts.map