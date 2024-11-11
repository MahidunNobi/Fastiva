import { IUser } from "@/types/UserTypes";
import mongoose, { Model, Schema } from "mongoose";


const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: String,
  imageUrl: String,
  provider: { type: String, required: true },  
  resetToken: String,
  resetTokenExpiry: Date,
});

const User: Model<IUser> =
  mongoose.models.Users || mongoose.model<IUser>("Users", UserSchema);

export default User;
