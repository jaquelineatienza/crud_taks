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
exports.DeleteTaksMongo = exports.UpdateTaks = exports.FindTaks = exports.CreateTaksMongo = void 0;
const TasksModel_1 = require("../Models/TasksModel");
class CreateTaksMongo {
    createTaks(taks) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTaks = new TasksModel_1.TaksModel(taks);
            return yield newTaks.save();
        });
    }
}
exports.CreateTaksMongo = CreateTaksMongo;
class FindTaks {
    findTaksByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TasksModel_1.TaksModel.findById(id);
        });
    }
    findTaks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TasksModel_1.TaksModel.find();
        });
    }
}
exports.FindTaks = FindTaks;
class UpdateTaks {
    updateTaks(id, taks) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TasksModel_1.TaksModel.findByIdAndUpdate(id, taks, { new: true });
        });
    }
}
exports.UpdateTaks = UpdateTaks;
class DeleteTaksMongo {
    deleteTaks(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TasksModel_1.TaksModel.findByIdAndDelete(id);
        });
    }
}
exports.DeleteTaksMongo = DeleteTaksMongo;
//# sourceMappingURL=TaksMongo.repository.js.map