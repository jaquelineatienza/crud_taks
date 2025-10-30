import { Router } from "express";
import { findTaksByIDController, findTaksControllers } from "../controllers/findTaks.Controller";
import { createTaksController } from "../controllers/createTaks.controller";
import { updateTaksController } from "../controllers/updateTaksControllet";
import { deleteTaksController } from "../controllers/deleteTaksControllet";



export const taksRoutes = Router()


taksRoutes.get("/allTaks", findTaksControllers);
taksRoutes.post("/createTaks", createTaksController)
taksRoutes.put('/update/:id', updateTaksController)
taksRoutes.get("/taks/:id", findTaksByIDController)
taksRoutes.delete("/delete/:id", deleteTaksController)

