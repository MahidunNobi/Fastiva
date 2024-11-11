import connectDB from "@/lib/connectDB";
import User from "@/models/UserModels";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please provide the valid credentials" },
        { status: 400 }
      );
    }
    await connectDB();
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "User Already exists" },
        { status: 403 }
      );
    }
    const salt = bcrypt.genSaltSync(16);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
      suspended: false,
    });
    await user.save();
    return NextResponse.json({ message: "User Created successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong..", error });
  }
};
