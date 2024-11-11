import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/UserModels";
import Service from "@/models/ServiceModel";

import { Types } from "mongoose";
import Booking from "@/models/BookingModel";
import { authOptions } from "@/utils/AuthOptions";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  try {      
    const user = await User.findOne({ email: session.user?.email });
    if (!user)
      return NextResponse.json({ message: "User Not found" }, { status: 401 });

    const service = await Service.findOne({_id: new Types.ObjectId(reqBody.service_id)})
    
    const booking = new Booking({
      ...reqBody,
      service_provider: service?.owner,
      service: service?._id,
      service_consumer: user._id,
      status: "pending",
    });
    
    await booking.save();    
    return NextResponse.json({ message: "Service booked succcessfully" });
    } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server error" }, {status:  500});
  }
};
