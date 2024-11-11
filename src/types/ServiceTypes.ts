import { ObjectId } from "mongoose"

export interface IService extends Document {
  _id: ObjectId;
service_name: string,
service_price: number,
service_down_payment: number,
service_area: string,
service_description: string
img_url: string
owner: ObjectId
}