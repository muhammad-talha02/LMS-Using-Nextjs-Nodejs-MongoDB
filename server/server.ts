import { app } from "./app";
require("dotenv").config();
import connecDB from "./utils/db";
app.listen(process.env.PORT , ()=>{
    console.log(`servers is Running at ${process.env.PORT} `);
    connecDB()
})