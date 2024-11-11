import { getService } from "@/actions/getServices";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const service = await getService(id);
  if (!service) {
    return (
      <div className="text-red-700 min-h-[90vh] grid place-content-center">
        Failed to load Service Details{" "}
      </div>
    );
  }
  return (
    <main className="mb-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-700 my-12">
            {" "}
            {service.service_name}{" "}
          </h1>
          <p className="roboto">
            {service.service_description} {service.service_description}{" "}
            {service.service_description}
          </p>
        </div>
        <div className="md:col-start-3 lg:col-start-4 flex flex-col items-center gap-6 pt-16">
          <div className="w-full overflow-hidden rounded-lg">
            <Image
              src={service.img_url}
              alt={service.service_name}
              width={400}
              height={100}
            />
          </div>
          <div className="border-2 w-full border-primary rounded-lg p-4 flex flex-col">
            <div className="flex gap-3 items-center justify-center my-4">
              <MapPin color="#ef5852" /> {service.service_area}
            </div>
            <div className="text-center">
              <span className="text- font-semibold">
                Price: {service.service_price} BDT.
              </span>
              <br />
              <span className="text-lg font-bold text-primary">
                Booking: {service.service_down_payment} BDT.
              </span>
            </div>
            <Link href={`${id}/book-form`} className="">
              <Button size={"lg"} className="mt-4 w-full">
                {" "}
                Book{" "}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
