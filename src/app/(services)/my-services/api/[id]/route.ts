import connectDB from "@/lib/connectDB"
import Booking from "@/models/BookingModel"
import Service from "@/models/ServiceModel"
import { Types } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest, {params}:{params: Promise<{id:string}>})=>{
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
export const DELETE = async(req:NextRequest, {params}:{params: Promise<{id:string}>})=>{
    const {id}= await params
    try {
        await connectDB()
        const service = await Service.findOne({_id:new Types.ObjectId(id)})

        await Booking.deleteMany({service: service?._id})

        await service?.deleteOne()
        
        return NextResponse.json({message: "Service Deleted Successfully"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "There was an error "}, {status: 500})
    }

}

export const PATCH = async(req:NextRequest, {params}:{params: Promise<{id:string}>})=>{
    const {id}= await params
    const reqBody = await req.json();
   
    try {      
        await Service.findOneAndUpdate(new Types.ObjectId(id), reqBody);

      return NextResponse.json({ message: "Service Updated succcessfully" });
      } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Server error" }, {status:  500});
    }
  };