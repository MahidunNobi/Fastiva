import { getServices } from "@/actions/getServices";
import ServiceCard from "@/components/Shared/ServiceCard/ServiceCard";
import Title from "@/components/Shared/Title/Title";

const Page = async () => {
  const services = await getServices({ limit: 6 });

  return (
    <main>
      <div className="container mx-auto min-h-screen">
        <div className="my-8 md:my-16">
          <Title title1="Our" title2="Services" cusClass="text-center" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {services.map((service) => (
            <ServiceCard
              _id={service._id}
              key={service._id.toString()}
              img_url={service.img_url}
              service_name={service.service_name}
              service_price={service.service_price}
              service_down_payment={service.service_down_payment}
              service_description={service.service_description}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
