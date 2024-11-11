import { getServices } from "@/actions/getServices";
import ServiceCard from "@/components/Shared/ServiceCard/ServiceCard";
import Title from "@/components/Shared/Title/Title";

const CustomerFavourites = async () => {
  const services = await getServices({ limit: 6 });

  return (
    <section className="my-36">
      <div className="container mx-auto">
        <Title title1="Customer Favourites" />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service._id.toString()}
              _id={service._id}
              img_url={service.img_url}
              service_name={service.service_name}
              service_price={service.service_price}
              service_down_payment={service.service_down_payment}
              service_description={service.service_description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFavourites;
