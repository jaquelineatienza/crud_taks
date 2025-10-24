import { createTaksController } from "@controllers/createTaks.controller";
import { deleteTaksController } from "@controllers/deleteTaksControllet";
import { findTaksByIDController, findTaksControllers } from "@controllers/findTaks.Controller";
import { updateTaksController } from "@controllers/updateTaksControllet";
import { Router } from "express";



export const taksRoutes = Router()


taksRoutes.get("/allTaks", findTaksControllers);
taksRoutes.post("/createTaks", createTaksController)
taksRoutes.put('/update/:id', updateTaksController)
taksRoutes.get("/taks/:id", findTaksByIDController)
taksRoutes.delete("/delete/:id", deleteTaksController)