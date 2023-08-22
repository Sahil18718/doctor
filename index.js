const express = require("express")
const cors=require("cors")
const {connection}=require("./db")
const {userRouter}=require("./routes/router")
const {drrouter} = require("./routes/dr.route")


require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Backend running fine")

})

app.use("/user",userRouter)
 app.use("/dr",drrouter)








app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Connected to Mongo Atlas")
    } catch (error) {
        console.log({"msg":error.message})
    }
    console.log("server running")
})