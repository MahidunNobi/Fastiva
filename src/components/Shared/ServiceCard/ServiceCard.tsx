import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ObjectId } from "mongoose";

type proptype = {
  _id: ObjectId;
  img_url: string;
  service_name: string;
  service_price: number;
  service_down_payment: number;
  service_description: string;
};

const ServiceCard = ({
  _id,
  img_url,
  service_name,
  service_price,
  service_down_payment,
  service_description: service_desctiption,
}: proptype) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[600px]">
      <div className="w-[200px] h-[250px] rounded-lg overflow-hidden">
        <Image
          src={img_url}
          width={400}
          height={100}
          alt="OK"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1 gap-3">
        <h6 className="text-xl font-bold"> {service_name}</h6>
        <div>
          <span className="text- font-semibold">
            {" "}
            Price: {service_price} BDT.
          </span>{" "}
          <br />
          <span className="text-lg font-bold text-primary">
            {" "}
            Booking: {service_down_payment} BDT.
          </span>
        </div>
        <p className="roboto">
          {service_desctiption.slice(0, 125)}
          ...{" "}
        </p>
        <div className="">
          <Link href={`/services/${_id}`}>
            <Button variant={"outline"} size={"lg"}>
              {" "}
              Details{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
