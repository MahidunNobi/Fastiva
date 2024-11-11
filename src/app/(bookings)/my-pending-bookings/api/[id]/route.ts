
import Booking from "@/models/BookingModel";
import User from "@/models/UserModels";
import { authOptions } from "@/utils/AuthOptions";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const reqBody = await req.json();

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(["Unauthenticated"], { status: 403 });
        }
        const user = await User.findOne({ email: session.user?.email });

        const booking = await Booking.findOne({
            _id: new Types.ObjectId(id),
            service_provider: user?._id,
        });
        if (!booking) {
            return NextResponse.json(
                { message: "You are not the service provider" },
                { status: 401 }
            );
        }        

        const Bookingg = await booking.updateOne(reqBody);

        return NextResponse.json({
            message: "Service Updated succcessfully",
            Bookingg,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
};
