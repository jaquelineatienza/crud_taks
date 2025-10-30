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
exports.updateTaksController = void 0;
const TaksMongo_repository_1 = require("../mongoRepository/TaksMongo.repository");
const updateEquipo_Service_1 = require("../services/updateEquipo.Service");
const updateTaksMongo = new TaksMongo_repository_1.UpdateTaks();
const updateTaksService = new updateEquipo_Service_1.UpdateTaksService(updateTaksMongo);
const updateTaksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taks = req.body;
        const id = req.params.id;
        const result = yield updateTaksService.updateTaks(id, taks);
        if (!result) {
            return res.status(404).json({ msg: "El equipo no se pudo actualizar o no existe" });
        }
        res.status(200).json({
            msg: "Equipo actualizado con éxito",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
});
exports.updateTaksController = updateTaksController;
//# sourceMappingURL=updateTaksControllet.js.map