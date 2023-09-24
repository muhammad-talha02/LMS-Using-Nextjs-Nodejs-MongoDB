import mongoose from "mongoose";
require("dotenv").config()

const dbUrl:string = process.env.DB_URL || ''


const connecDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log(`Databasd Connected with ${data.connection.host}`)
        })
    } catch (error:any) {
        console.log(`Error to connect database ${error.message}`)
        // setTimeout(connecDB, 5000)
    }
}


export default connecDB;