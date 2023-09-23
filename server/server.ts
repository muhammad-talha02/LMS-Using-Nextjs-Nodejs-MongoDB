import { app } from "./app";
require("dotenv").config();

app.listen(process.env.PORT , ()=>{
    console.log(`servers is Running at ${process.env.PORT} `)
})