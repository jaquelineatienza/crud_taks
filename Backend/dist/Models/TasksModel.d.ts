import mongoose from "mongoose";
import { ITask } from "../types/TasksTypes";
export declare const TaksModel: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=TasksModel.d.ts.map