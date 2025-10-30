import express from "express"
import morgan from "morgan"
import cors from "cors"
import connections from "./config/db"
import { taksRoutes } from "./Routes/task.Routes"
import ENV from "./config/confingENV."




const app = express()



app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use("/api", taksRoutes)

app.listen(ENV.PORT, async () => {
    console.log(`the server is runing in the port ${ENV.PORT}`)
    await connections();
})