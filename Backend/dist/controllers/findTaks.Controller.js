"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTaksByIDController = exports.findTaksControllers = void 0;
const TaksMongo_repository_1 = require("../mongoRepository/TaksMongo.repository");
const findEquipos_Service_1 = require("../services/findEquipos.Service");
const findTaksMongo = new TaksMongo_repository_1.FindTaks();
const findTaksService = new findEquipos_Service_1.FindTaksService(findTaksMongo);
const findTaksControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield findTaksService.findTaks();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.findTaksControllers = findTaksControllers;
const findTaksByIDController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield findTaksService.findTaksByID(id);
        res.status(200).json({ msg: 'the taks', result });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.findTaksByIDController = findTaksByIDController;
//# sourceMappingURL=findTaks.Controller.js.map