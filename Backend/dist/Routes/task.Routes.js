"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taksRoutes = void 0;
const express_1 = require("express");
const findTaks_Controller_1 = require("../controllers/findTaks.Controller");
const createTaks_controller_1 = require("../controllers/createTaks.controller");
const updateTaksControllet_1 = require("../controllers/updateTaksControllet");
const deleteTaksControllet_1 = require("../controllers/deleteTaksControllet");
exports.taksRoutes = (0, express_1.Router)();
exports.taksRoutes.get("/allTaks", findTaks_Controller_1.findTaksControllers);
exports.taksRoutes.post("/createTaks", createTaks_controller_1.createTaksController);
exports.taksRoutes.put('/update/:id', updateTaksControllet_1.updateTaksController);
exports.taksRoutes.get("/taks/:id", findTaks_Controller_1.findTaksByIDController);
exports.taksRoutes.delete("/delete/:id", deleteTaksControllet_1.deleteTaksController);
//# sourceMappingURL=task.Routes.js.map