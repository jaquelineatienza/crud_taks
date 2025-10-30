import { ICreateTaks } from "../repositories/createTaks";
import { ITask } from "../types/TasksTypes";




export class CreateTaksService implements ICreateTaks {
    constructor(
        private readonly createTaksRepo: ICreateTaks
    ) {

    }
    async createTaks(taks: ITask): Promise<ITask> {
        return this.createTaksRepo.createTaks(taks)
    }
}