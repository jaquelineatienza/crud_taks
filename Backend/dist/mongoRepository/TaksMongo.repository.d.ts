import { ICreateTaks } from "../repositories/createTaks";
import { IDeleteTaks } from "../repositories/DeleteTaks";
import { IFindTaks } from "../repositories/FindTaks";
import { IUpdateTaks } from "../repositories/UpadateTaks";
import { ITask } from "../types/TasksTypes";
export declare class CreateTaksMongo implements ICreateTaks {
    createTaks(taks: ITask): Promise<ITask>;
}
export declare class FindTaks implements IFindTaks {
    findTaksByID(id: any): Promise<ITask | null>;
    findTaks(): Promise<ITask[]>;
}
export declare class UpdateTaks implements IUpdateTaks {
    updateTaks(id: any, taks: Partial<ITask>): Promise<ITask | null>;
}
export declare class DeleteTaksMongo implements IDeleteTaks {
    deleteTaks(id: any): Promise<void>;
}
//# sourceMappingURL=TaksMongo.repository.d.ts.map