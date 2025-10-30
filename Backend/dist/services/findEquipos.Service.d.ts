import { IFindTaks } from "../repositories/FindTaks";
import { ITask } from "../types/TasksTypes";
export declare class FindTaksService implements IFindTaks {
    private readonly taksRepo;
    constructor(taksRepo: IFindTaks);
    findTaks(): Promise<ITask[]>;
    findTaksByID(id: any): Promise<ITask | null>;
}
//# sourceMappingURL=findEquipos.Service.d.ts.map