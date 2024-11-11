import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="hero-bg-image flex items-center text-white font-semibold">
      <div className="container mx-auto">
        <span className="italic font-light text-gray-300 roboto-slab">
          {" "}
          We are the Event Management Specialists
        </span>
        <h1 className="text-4xl md:text-6xl my-6 poppins max-w-[700px]">
          {" "}
          WE PERSONALIZE YOUR MOMORABLE EVENTS{" "}
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <Button size={"lg"}>Explore Events</Button>
          <Button variant={"outline"} size={"lg"}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
