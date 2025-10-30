import { TaksModel } from "../Models/TasksModel";
import { ICreateTaks } from "../repositories/createTaks";
import { IDeleteTaks } from "../repositories/DeleteTaks";
import { IFindTaks } from "../repositories/FindTaks";
import { IUpdateTaks } from "../repositories/UpadateTaks";
import { ITask } from "../types/TasksTypes";


export class CreateTaksMongo implements ICreateTaks {
    async createTaks(taks: ITask): Promise<ITask> {
        const newTaks = new TaksModel(taks);
        return await newTaks.save()
    }
}

export class FindTaks implements IFindTaks {
    async findTaksByID(id: any): Promise<ITask | null> {
        return await TaksModel.findById(id)
    }
    async findTaks(): Promise<ITask[]> {
        return await TaksModel.find()
    }
}
export class UpdateTaks implements IUpdateTaks {
    async updateTaks(
        id: any,
        taks: Partial<ITask>
    ): Promise<ITask | null> {
        return await TaksModel.findByIdAndUpdate(
            id,
            taks,
            { new: true }
        );
    }
}
export class DeleteTaksMongo implements IDeleteTaks {
    async deleteTaks(id: any): Promise<void> {
        await TaksModel.findByIdAndDelete(id)
    }
}