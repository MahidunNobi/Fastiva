"use client";
import Loader from "@/components/Shared/Loader/Loader";
import Title from "@/components/Shared/Title/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { IService } from "@/types/ServiceTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const {
    data: myServices,
    isLoading,
    refetch,
  } = useQuery<IService[]>({
    queryKey: ["get-my-services"],
    queryFn: async () => {
      const res = await axios.get("/my-services/api");
      return res.data;
    },
  });

  const handleDelete = async (id: string) => {
    const res = await axios.delete(`/my-services/api/${id}`);
    if (res.status !== 200) {
      return toast({
        variant: "destructive",
        title: "Failed to delete Service",
      });
    }
    toast({
      variant: "success",
      title: "Service deleted successfully!",
    });
    refetch();
  };
  return (
    <main className="my-16 min-h-[60vh]">
      <div className="container mx-auto">
        <Title title1="My" title2="Services" />

        {isLoading ? (
          <div className="w-full mih-h-96 grid place-content-center">
            <Loader />
          </div>
        ) : (
          <Table>
            <TableCaption>A list of your services.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-">Name</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-nowrap">Booking Fee</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myServices &&
                myServices.map((service) => (
                  <TableRow key={service._id.toString()}>
                    <TableCell className="font-medium">
                      {service.service_name}
                    </TableCell>
                    <TableCell>{service.service_area}</TableCell>
                    <TableCell>{service.service_price}</TableCell>
                    <TableCell>{service.service_down_payment}</TableCell>
                    <TableCell className="text-center flex justify-center items-center gap-3">
                      <Link href={`/my-services/update/${service._id}`}>
                        <Button variant={"outline"}>
                          <PencilLine />
                        </Button>
                      </Link>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDelete(service?._id.toString())}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
};

export default Page;
