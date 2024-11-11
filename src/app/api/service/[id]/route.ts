import connectDB from "@/lib/connectDB"
import Service from "@/models/ServiceModel"
import { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest, {params}:{params:Promise<{id:string}>})=>{
    const {id}= await params    
    try {
        await connectDB()
        const service = await Service.findById(new Types.ObjectId(id))        
        return NextResponse.json(service)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "There was an error "}, {status: 500})
    }

}