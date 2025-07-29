import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";

const app = express()
const PORT = process.env.PORT || 3000;

await connectDb();

// middlewares 
app.use(cors())
app.use(express.json())


// api endpoints 
app.use('/api/user', userRouter)




app.get("/", (req, res)=>{
    res.send("API is working")
})

app.listen(PORT, ()=> {
    console.log(`server is running on PORT ${PORT}`)
})