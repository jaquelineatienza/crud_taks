import { Request, Response } from "express";
import { FindTaks } from "../mongoRepository/TaksMongo.repository";
import { IFindTaks } from "../repositories/FindTaks";
import { FindTaksService } from "../services/findEquipos.Service";

const findTaksMongo: IFindTaks = new FindTaks()
const findTaksService = new FindTaksService(findTaksMongo)


export const findTaksControllers = async (req: Request, res: Response) => {
    try {
        const result = await findTaksService.findTaks()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
export const findTaksByIDController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = await findTaksService.findTaksByID(id)
        res.status(200).json({ msg: 'the taks', result })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
