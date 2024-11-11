
import connectDB from "@/lib/connectDB"
import Service from "@/models/ServiceModel"
import User from "@/models/UserModels"
import { authOptions } from "@/utils/AuthOptions"

import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async()=>{
    try {
        const session = await getServerSession(authOptions)        
        if(!session){
            return NextResponse.json(["Data Found"])
        }
        await connectDB()
        const user = await User.findOne({email: session.user?.email})
        const services = await Service.find({owner: user?._id})        
        return NextResponse.json(services)
    } catch (error) {        
        console.log(error)
        return NextResponse.json({message: 'Server side error'}, {status:500})
    }
}