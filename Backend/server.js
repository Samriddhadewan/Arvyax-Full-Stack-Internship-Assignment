import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import sessionRouter from "./routes/sessionRoute.js";

const app = express()
const PORT = process.env.PORT || 3000;

await connectDb();

// middlewares 
app.use(cors())
app.use(express.json())


// api endpoints 
app.use('/api', userRouter)
app.use('/api', sessionRouter)




app.get("/", (req, res)=>{
    res.send("API is working")
})

app.listen(PORT, ()=> {
    console.log(`server is running on PORT ${PORT}`)
})