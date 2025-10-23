import * as dotenv from "dotenv";
dotenv.config();

interface Env {
    PORT: number;
    MONGO_URL: string;

}

const ENV: Env = {
    PORT: Number(process.env.PORT) || 3000,
    MONGO_URL: String(process.env.mongoDb),

};

export default ENV;
