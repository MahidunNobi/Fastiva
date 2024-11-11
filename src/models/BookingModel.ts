import { IBooking } from "@/types/BookingType";
import { model, Model, models, Schema } from "mongoose";


const BookingSchema:Schema<IBooking> = new Schema({
    event_location: {type: String, required: true},
    phone_number: {type: String, required: true},
    status: {type: String, required: true, default: "pending"},
    invited_guest_count: {type: String},
    event_date: {type: Date, required: true},    
    service_provider: {type: Schema.ObjectId, ref: "Users"},
    service: {type: Schema.ObjectId, ref: "Services"},
    service_consumer: {type: Schema.ObjectId, ref: "Users"}
})

const Booking:Model<IBooking> = models.Booking || model("Booking", BookingSchema)

export default Booking;