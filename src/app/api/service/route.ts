import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/UserModels";
import Service from "@/models/ServiceModel";
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
    
    const service = new Service({
      ...reqBody,
      owner: user?._id,
    });
    
    await service.save();    
    return NextResponse.json({ message: "Service added succcessfully" });
    } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Server error" }, {status:  500});
  }
};
