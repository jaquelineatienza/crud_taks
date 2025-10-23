import connections from "@config/db"
import express from "express"
import morgan from "morgan"
import { taksRoutes } from "Routes/task.Routes"



const app = express()



app.use(morgan("dev"))
app.use(express.json())
app.use(taksRoutes)

app.listen(3000, async () => {
    console.log('the server is runing in the port ')
    await connections();
})