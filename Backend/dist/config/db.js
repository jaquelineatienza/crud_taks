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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const confingENV_1 = __importDefault(require("./confingENV."));
;
const connections = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!confingENV_1.default.MONGO_URL) {
        throw new Error("Database URL is not defined in the environment variables.");
    }
    try {
        yield mongoose_1.default.connect(confingENV_1.default.MONGO_URL, { serverSelectionTimeoutMS: 30000, connectTimeoutMS: 30000 });
        console.log(("database successfully connected"));
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.error(("Error en la conexión de la base de datos"));
        throw error;
    }
});
exports.default = connections;
//# sourceMappingURL=db.js.map