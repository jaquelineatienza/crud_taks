import mongoose, { Schema } from "mongoose";
import { ITask } from "../types/TasksTypes";


const TaksSchema = new Schema<ITask>({
    titulo: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    estado: {
        type: String,
        enum: ["pendiente", "completado"],
        default: "pendiente"
    }


})

export const TaksModel = mongoose.model<ITask>("Taks", TaksSchema)