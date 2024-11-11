import Image from "next/image";
import img1 from "@/assets/PhotoGallery/1.jpg";
import img2 from "@/assets/PhotoGallery/2.jpg";
import img3 from "@/assets/PhotoGallery/3.jpg";
import img4 from "@/assets/PhotoGallery/4.jpg";
import img5 from "@/assets/PhotoGallery/5.jpg";
import img6 from "@/assets/PhotoGallery/6.jpg";
import img7 from "@/assets/PhotoGallery/7.jpg";
import img8 from "@/assets/PhotoGallery/8.jpg";
import Title from "@/components/Shared/Title/Title";

export const galleryData = [
  {
    id: 1,
    title: "Social Meetings",
    subtitle: "Proposal events, Social meetings",
    img: img1,
  },
  {
    id: 2,
    title: "Birthday Parties",
    subtitle: "Birthday parties, Social meetings, Anniversary events",
    img: img2,
  },
  {
    id: 3,
    title: "Proposal Parties",
    subtitle: "Product launces, Proposal events, Social meetings",
    img: img3,
  },
  {
    id: 4,
    title: "Wedding Events",
    subtitle: " Proposal events, Social meetings, Wedding events",
    img: img4,
  },
  {
    id: 5,
    title: "Kids Parties",
    subtitle: "Birthday parties",
    img: img5,
  },
  {
    id: 6,
    title: "Kids at Parties",
    subtitle: "Birthday parties",
    img: img6,
  },
  {
    id: 7,
    title: "Corporate Events",
    subtitle: "Corporate Events, Product Launces",
    img: img7,
  },
  {
    id: 8,
    title: "Social Meetings",
    subtitle: "Proposal events, social meetings",
    img: img8,
  },
];
const DventsGallery = () => {
  return (
    <section className=" my-16">
      <Title title1="Events" title2="Gallery" cusClass="text-center my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {galleryData.map((ev) => (
          <div key={ev.id} className="relative group cursor-pointer">
            <Image src={ev.img} alt={ev.title} width={500} height={100} />
            <div className="absolute top-0 left-full group-hover:left-0 duration-300 w-full h-full bg-[#242424ce] text-white p-6">
              <h5 className="text-xl font-semibold">{ev.title}</h5>
              <span className="text-xs">{ev.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DventsGallery;
