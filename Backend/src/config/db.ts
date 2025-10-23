import mongoose, { Connection } from "mongoose";
import ENV from "./confingENV.";
;

const connections = async (): Promise<Connection> => {
    if (!ENV.MONGO_URL) {
        throw new Error("Database URL is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(ENV.MONGO_URL, { serverSelectionTimeoutMS: 30000, connectTimeoutMS: 30000 });
        console.log(("database successfully connected"));

        return mongoose.connection;
    } catch (error) {

        console.error(("Error en la conexión de la base de datos"));
        throw error;
    }
};

export default connections;
