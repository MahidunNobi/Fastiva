import { IService } from "@/types/ServiceTypes";
import { model, Model, models, Schema } from "mongoose";


const ServiceSchema:Schema<IService> = new Schema({
    service_name: {type: String, required: true},
    service_price: {type: Number, required: true},
    service_down_payment: {type: Number},
    service_area: {type: String, required: true},
    service_description: {type: String, required: true},
    img_url: {type: String, required: true},
    owner: {type: Schema.ObjectId, ref: "Users"}
})

const Service:Model<IService> = models.Services || model("Services", ServiceSchema)

export default Service;