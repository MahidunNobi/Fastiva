
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  imageUrl?: string;
  provider: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}
