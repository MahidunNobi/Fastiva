import CustomerFavourites from "@/components/Home/CustomerFavourites/CustomerFavourites";
import DventsGallery from "@/components/Home/DventsGallery/DventsGallery";
import Hero from "@/components/Home/Hero/Hero";
import Wellcome from "@/components/Home/Wellcome/Wellcome";
import Loader from "@/components/Shared/Loader/Loader";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Hero />
      <Wellcome />
      <Suspense
        fallback={
          <div className="w-full min-h-96 grid place-content-center">
            <Loader />
          </div>
        }
      >
        <CustomerFavourites />
      </Suspense>
      <DventsGallery />
    </main>
  );
}
