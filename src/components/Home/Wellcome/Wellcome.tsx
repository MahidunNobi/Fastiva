import Image from "next/image";
import welcomeImg from "@/assets/wellcome.jpg";
import { Button } from "@/components/ui/button";
import Title from "@/components/Shared/Title/Title";
import Subtitle from "@/components/Shared/Subtitle/Subtitle";

const Wellcome = () => {
  return (
    <section className="my-36">
      <div className="container mx-auto flex flex-col md:flex-row gap-24 items-center">
        <div className="md:min-w-96">
          <Image src={welcomeImg} width={350} height={600} alt="Welcome" />
        </div>

        <div>
          <Title title1="Welcome to" title2="Fastiva" />
          <Subtitle
            subtitle="Making your events smarter & impactful by personalised event
            management."
          />

          <p className="roboto">
            {" "}
            Welcome to Fastiva, where your dream events come to life
            effortlessly. We&apos;re here to make planning stress-free and
            enjoyable, handling every detail from start to finish. Let&apos;s
            create an experience that your guests will remember for years to
            come!
            <br />
            <br />
            We&apos;re thrilled to be a part of your journey to create
            unforgettable experiences. Whether you&apos;re planning a wedding,
            corporate event, or private celebration, our platform is here to
            simplify every step. With seamless tools and personalized support,
            Fastiva empowers you to turn your vision into reality. Dive in,
            explore our features, and let&apos;s start planning an event that
            will leave a lasting impression on every guest.
          </p>
          <Button className="mt-6" variant={"outline"} size={"lg"}>
            {" "}
            Learn More{" "}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Wellcome;
