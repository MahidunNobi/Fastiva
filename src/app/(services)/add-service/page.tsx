"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/Shared/Loader/Loader";

type FormType = {
  service_name: string;
  service_price: string;
  service_down_payment: string;
  service_area: string;
  img_url: string;
  service_description: string;
};

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: addService, isPending } = useMutation({
    mutationFn: (formData: FormType) => {
      return axios.post("/api/service", formData);
    },
  });

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const service_name = form.service_name.value;
    const service_price = form.service_price.value;
    const service_down_payment = form.service_down_payment.value;
    const service_area = form.service_area.value;
    const service_description = form.service_description.value;
    const service_image = form.service_image.files?.[0] || null;

    setLoading(true);
    // Saving the image and getting the url
    const formData = new FormData();
    formData.append("image", service_image);
    const imgRes = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        params: {
          key: "ff3a35f7d258a586b88aa9d075fd1c33",
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (imgRes.status !== 200) {
      return toast({
        variant: "destructive",
        title: "Failed to upload image",
      });
    }
    const imageUrl = imgRes.data.data.display_url;
    setLoading(false);

    // Saving the service
    const service = {
      service_name,
      service_price,
      service_down_payment,
      service_area,
      img_url: imageUrl,
      service_description,
    };
    addService(service, {
      onSuccess: (data) => {
        toast({
          variant: "success",
          title: data.data.message,
        });
        form.reset();
      },
      onError: (err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "There was an error please check the console.",
        });
      },
    });
  };
  return (
    <main>
      <div className="container mx-auto grid place-content-center min-h-[90vh]">
        <div className="border-2 border-primary px-4 py-16 rounded-lg">
          <h2 className="text-4xl text-center font-semibold mb-6">
            Add New Service
          </h2>
          <form
            onSubmit={handleAdd}
            className="flex flex-col gap-3 md:min-w-96"
          >
            <Input
              type="text"
              name="service_name"
              required
              placeholder="Khalid Catering"
            />
            <Input
              type="text"
              name="service_price"
              required
              placeholder="Service Price: 100 BDT"
            />
            <Input
              type="text"
              name="service_down_payment"
              placeholder="Down Payment: 80 BDT"
            />
            <Input
              type="text"
              name="service_area"
              required
              placeholder="District"
            />
            <Textarea
              name="service_description"
              required
              placeholder="e.g. We serve the catering services all over Jashore City"
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              {/* <Label htmlFor="picture">Picture</Label> */}
              <Input id="picture" type="file" name="service_image" required />
            </div>
            <Button type="submit" disabled={isPending || loading}>
              {isPending || loading ? <Loader /> : "ADD"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
