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
exports.createTaksController = void 0;
const TaksMongo_repository_1 = require("../mongoRepository/TaksMongo.repository");
const createTaks_Service_1 = require("../services/createTaks.Service");
const taksRepoMongo = new TaksMongo_repository_1.CreateTaksMongo();
const createTakservice = new createTaks_Service_1.CreateTaksService(taksRepoMongo);
const createTaksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taks = req.body;
        const result = yield createTakservice.createTaks(taks);
        if (!result) {
            res.status(304).json({ msg: 'the equipo no created' });
        }
        res.status(201).json({ msg: 'the equipo created successfull' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'the internal server error', error });
    }
});
exports.createTaksController = createTaksController;
//# sourceMappingURL=createTaks.controller.js.map