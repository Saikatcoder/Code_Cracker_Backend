import express from "express"
import dotenv from "dotenv"
import authRoter from "./routes/auth.router.js";

dotenv.config()
const app = express();

const port = process.env.PORT || 3000;


app.get("/", (req,res)=>{
    res.send("welcome to codeCracker");
})

app.use("/api/v1/auth", authRoter)

app.listen(port, (err)=> {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});