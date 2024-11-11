"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, use, useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/Shared/Loader/Loader";
import { IService } from "@/types/ServiceTypes";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/Shared/DatePicker/DatePicker";
import { useRouter } from "next/navigation";

type FormType = {
  event_location: string;
  phone_number: string;
  event_date: Date;
  invited_guest_count: string;
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const { id } = use(params);
  //   -------Fetching data-------
  const { data } = useQuery<IService>({
    queryKey: ["get-service"],
    queryFn: async () => {
      const res = await axios.get(`/api/service/${id}`);
      return res.data;
    },
  });

  //   --------- Posting booking data---------
  const { mutate: bookService, isPending } = useMutation({
    mutationFn: (formData: FormType) => {
      return axios.post("/api/service/book", formData);
    },
  });

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const event_location = form.event_location.value;
    const phone_number = form.phone_number.value;
    const event_date = date;
    const invited_guest_count = form.invited_guest_count.value;

    // Validation
    if (phone_number.length < 11) {
      return toast({
        variant: "destructive",
        title: "Phone number must be 11 Character.🙂",
      });
    } else if (!event_date) {
      return toast({
        variant: "destructive",
        title: "Please select a date.😒",
      });
    }
    // Saving the service
    const event = {
      service_id: id,
      event_location,
      phone_number,
      event_date,
      invited_guest_count,
    };

    bookService(event, {
      onSuccess: (data) => {
        toast({
          variant: "success",
          title: data.data.message,
        });
        form.reset();
        router.push("/services");
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
            Book Service
          </h2>
          <form onSubmit={handleAdd} className="md:min-w-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* ---------------- Service Name--------*/}
              <div>
                <Label htmlFor="service_name"> Service Name </Label>
                <Input
                  type="text"
                  name="service_name"
                  id="service_name"
                  readOnly
                  defaultValue={data?.service_name}
                  placeholder="Khalid Catering"
                />
              </div>

              {/* ---------------- Service Price--------*/}
              <div>
                <Label htmlFor="service_price"> Service Price </Label>
                <Input
                  type="text"
                  name="service_price"
                  id="service_price"
                  readOnly
                  defaultValue={data?.service_price}
                  placeholder="Service Price: 100 BDT"
                />
              </div>

              {/* ---------------- Booking Fee --------*/}
              <div>
                <Label htmlFor="booking_fee"> Booking Fee </Label>
                <Input
                  type="text"
                  name="service_down_payment"
                  id="booking_fee"
                  defaultValue={data?.service_down_payment}
                  readOnly
                  placeholder="Down Payment: 80 BDT"
                />
              </div>

              {/* ---------------- Service Area--------*/}
              <div>
                <Label htmlFor="service_area"> Service Area </Label>
                <Input
                  type="text"
                  name="service_area"
                  id="service_area"
                  defaultValue={data?.service_area}
                  readOnly
                  placeholder="District"
                />
              </div>

              {/* ---------------- Event Location--------*/}
              <div>
                <Label htmlFor="event_location"> Event Location </Label>
                <Input
                  type="text"
                  name="event_location"
                  id="event_location"
                  required
                  placeholder="38-2 Hilton Street, California, USA"
                />
              </div>

              {/* ---------------- Phone Number --------*/}
              <div>
                <Label htmlFor="phone_number"> Phone Number </Label>
                <Input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  required
                  placeholder="(+01) 123 456 7890"
                />
              </div>

              {/* ---------------- Event Date --------*/}
              <div className="flex flex-col gap-1">
                <Label htmlFor="phone_number"> Event Date </Label>
                <DatePicker date={date} setDate={setDate} />
              </div>

              {/* ---------------- Invited Guest Count --------*/}
              <div>
                <Label htmlFor="invited_guest_count">
                  {" "}
                  Invited Guest Count (optional)
                </Label>
                <Input
                  type="number"
                  name="invited_guest_count"
                  id="invited_guest_count"
                  placeholder="e.g. 30"
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button type="submit" size={"lg"} disabled={isPending}>
                {isPending ? <Loader /> : "ADD"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
