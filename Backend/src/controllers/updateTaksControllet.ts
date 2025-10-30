import { Request, Response } from "express";
import { UpdateTaks } from "../mongoRepository/TaksMongo.repository";
import { IUpdateTaks } from "../repositories/UpadateTaks";
import { UpdateTaksService } from "../services/updateEquipo.Service";
import { ITask } from "../types/TasksTypes";


const updateTaksMongo: IUpdateTaks = new UpdateTaks();
const updateTaksService = new UpdateTaksService(updateTaksMongo);

export const updateTaksController = async (req: Request, res: Response) => {
    try {

        const taks: ITask = req.body;
        const id = req.params.id;
        const result = await updateTaksService.updateTaks(id, taks);

        if (!result) {
            return res.status(404).json({ msg: "El equipo no se pudo actualizar o no existe" });
        }

        res.status(200).json({
            msg: "Equipo actualizado con éxito",
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};
