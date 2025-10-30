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
exports.deleteTaksController = void 0;
const TaksMongo_repository_1 = require("../mongoRepository/TaksMongo.repository");
const deleteEquipo_Service_1 = require("../services/deleteEquipo.Service");
const taksRepoMongo = new TaksMongo_repository_1.DeleteTaksMongo();
const deleteTaksService = new deleteEquipo_Service_1.DeleteTaksService(taksRepoMongo);
const deleteTaksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield deleteTaksService.deleteTaks(id);
        res.status(200).json({ msg: 'the equipo delete succesfull' });
    }
    catch (error) {
        res.status(500).json({ msg: 'the internal server error' });
    }
});
exports.deleteTaksController = deleteTaksController;
//# sourceMappingURL=deleteTaksControllet.js.map