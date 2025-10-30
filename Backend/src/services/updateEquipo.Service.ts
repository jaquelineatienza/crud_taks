import { IUpdateTaks } from "../repositories/UpadateTaks";
import { ITask } from "../types/TasksTypes";




export class UpdateTaksService implements IUpdateTaks {
    constructor(
        private readonly updateTaksService: IUpdateTaks
    ) { }

    async updateTaks(id: any, taks: Partial<ITask>): Promise<ITask | null> {
        return await this.updateTaksService.updateTaks(id, taks)
    }
}