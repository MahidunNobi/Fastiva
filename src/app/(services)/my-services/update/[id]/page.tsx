"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/Shared/Loader/Loader";
import { IService } from "@/types/ServiceTypes";
import { useRouter } from "next/navigation";

type FormType = {
  service_name: string;
  service_price: string;
  service_down_payment: string;
  service_area: string;
  img_url: string;
  service_description: string;
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { data: service } = useQuery<IService>({
    queryKey: ["get-my-service", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`/my-services/api/${id}`);
      return res.data;
    },
  });

  const { mutate: addService, isPending } = useMutation({
    mutationFn: (formData: FormType) => {
      return axios.patch(`/my-services/api/${id}`, formData);
    },
  });

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const service_name = form.service_name.value;
    const service_price = form.service_price.value;
    const service_down_payment = form.service_down_payment.value;
    const service_area = form.service_area.value;
    const service_description = form.service_description.value;
    const service_image = form.service_image.files?.[0] || null;

    let imageUrl: string = service?.img_url || "";

    if (service_image) {
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
      imageUrl = imgRes.data.data.display_url;
    }
    setLoading(false);

    // Saving the service
    const newService = {
      service_name,
      service_price,
      service_down_payment,
      service_area,
      img_url: imageUrl,
      service_description,
    };
    addService(newService, {
      onSuccess: (data) => {
        toast({
          variant: "success",
          title: data.data.message,
        });
        form.reset();
        router.push("/my-services");
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
            Update Service
          </h2>
          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-3 md:min-w-96"
          >
            <Input
              type="text"
              name="service_name"
              required
              defaultValue={service?.service_name}
              placeholder="Khalid Catering"
            />
            <Input
              type="text"
              name="service_price"
              required
              defaultValue={service?.service_price}
              placeholder="Service Price: 100 BDT"
            />
            <Input
              type="text"
              name="service_down_payment"
              defaultValue={service?.service_down_payment}
              placeholder="Down Payment: 80 BDT"
            />
            <Input
              type="text"
              name="service_area"
              required
              defaultValue={service?.service_area}
              placeholder="District"
            />
            <Textarea
              name="service_description"
              required
              defaultValue={service?.service_description}
              placeholder="e.g. We serve the catering services all over Jashore City"
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              {/* <Label htmlFor="picture">Picture</Label> */}
              <Input id="picture" type="file" name="service_image" />
            </div>
            <Button type="submit" disabled={isPending || loading}>
              {isPending || loading ? <Loader /> : "Update"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
