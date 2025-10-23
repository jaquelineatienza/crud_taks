import mongoose, { Schema } from "mongoose";
import { ITask } from "types/TasksTypes";
import { string } from "zod";

const TaksSchema = new Schema<ITask>({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        enum: {
            values: ["pendiente", "completado"],
            message: "El estado debe ser 'pendiente' o 'completado'"
        },
        required: true,
        default: "pendiente"

    }


})

export const TaksModel = mongoose.model<ITask>("Taks", TaksSchema)