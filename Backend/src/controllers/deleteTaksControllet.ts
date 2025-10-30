
import { Request, Response } from "express";
import { DeleteTaksMongo } from "../mongoRepository/TaksMongo.repository";
import { IDeleteTaks } from "../repositories/DeleteTaks";
import { DeleteTaksService } from "../services/deleteEquipo.Service";


const taksRepoMongo: IDeleteTaks = new DeleteTaksMongo()
const deleteTaksService = new DeleteTaksService(taksRepoMongo)

export const deleteTaksController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await deleteTaksService.deleteTaks(id);

        res.status(200).json({ msg: 'the equipo delete succesfull' })
    } catch (error) {
        res.status(500).json({ msg: 'the internal server error' })
    }
}
