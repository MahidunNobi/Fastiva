
import Booking from "@/models/BookingModel"
import User from "@/models/UserModels"
import { authOptions } from "@/utils/AuthOptions"

import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async()=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json(["Unauthenticated"], {status:  403})
        }
        const user = await User.findOne({email: session.user?.email})
        const bookings = await Booking.find({service_provider: user?._id}).populate("service service_consumer") 

        return NextResponse.json(bookings)
    } catch (error) {        
        console.log(error)
        return NextResponse.json({message: 'Server side error'}, {status:500})
    }
}