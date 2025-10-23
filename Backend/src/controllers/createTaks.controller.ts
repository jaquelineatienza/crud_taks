import { ICreateTaks } from "@repositories/createTaks";
import { CreateTaksService } from "@services/createTaks.Service";
import { Request, Response } from "express";
import { CreateTaksMongo } from "mongoRepository/TaksMongo.repository";
import { create } from "ts-node";
import { ITask } from "types/TasksTypes";



const taksRepoMongo: ICreateTaks = new CreateTaksMongo();
const createTakservice = new CreateTaksService(taksRepoMongo);

export const createTaksController = async (req: Request, res: Response) => {
    try {
        const taks: ITask = req.body;
        const result = await createTakservice.createTaks(taks)
        if (!result) {
            res.status(304).json({ msg: 'the equipo no created' })
        }
        res.status(201).json({ msg: 'the equipo created successfull' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'the internal server error', error })
    }
}
