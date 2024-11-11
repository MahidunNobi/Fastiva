"use server"

import connectDB from "@/lib/connectDB"
import Service from "@/models/ServiceModel"
import { IService } from "@/types/ServiceTypes";
import { Types } from "mongoose";

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getServices = async({limit = 0}:{limit?:number}): Promise<IService[]>=>{
    // await delay(5000);    
    await connectDB()
    const services = await Service.find().limit(limit)
    return services
}

export const getService = async(id:string):Promise<IService | null>=>{
    await connectDB()
    const service = await Service.findById(new Types.ObjectId(id))

    return service
}