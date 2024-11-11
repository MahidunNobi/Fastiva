import { ObjectId } from "mongoose"

export interface IBooking<X=ObjectId, Y=ObjectId, Z=ObjectId> extends Document {
    _id: ObjectId;
    event_location:string,
    phone_number: string,
    invited_guest_count: string;
    event_date: Date;
    status: "pending" | "approved";
    service_provider: X;
    service: Y;
    service_consumer: Z;
}