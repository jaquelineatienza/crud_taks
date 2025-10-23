import { IFindTaks } from "@repositories/FindTaks"
import { ITask } from "types/TasksTypes"


export class FindTaksService implements IFindTaks {
    constructor(
        private readonly taksRepo: IFindTaks
    ) { }
    async findTaks(): Promise<ITask[]> {
        return await this.taksRepo.findTaks()
    }
    async findTaksByID(id: any): Promise<ITask | null> {
        return await this.taksRepo.findTaksByID(id)
    }

}