import mongoose from "mongoose";

const connection:{isConnected:boolean} ={isConnected: false}

async function connectDB(){
    if(connection.isConnected) return

    await mongoose.connect(process.env.MONGODB_URI!)
    connection.isConnected  = true
}

export default connectDB;