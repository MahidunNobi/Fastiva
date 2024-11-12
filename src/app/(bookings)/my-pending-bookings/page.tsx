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
import formatDate from "@/lib/formateDate";
import { IBooking } from "@/types/BookingType";
import { IService } from "@/types/ServiceTypes";
import { IUser } from "@/types/UserTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ObjectId } from "mongoose";

const Page = () => {
  const {
    data: myBookings,
    isLoading,
    refetch,
  } = useQuery<IBooking<ObjectId, IService, IUser>[]>({
    queryKey: ["get-my-bookings"],
    queryFn: async () => {
      const res = await axios.get("/my-pending-bookings/api");
      return res.data;
    },
  });

  console.log(myBookings);
  const handleApprove = async (id: string) => {
    const res = await axios.patch(`/my-pending-bookings/api/${id}`, {
      status: "approved",
    });
    if (res.status !== 200) {
      return toast({
        variant: "destructive",
        title: "Failed to delete Service",
      });
    }
    toast({
      variant: "success",
      title: "Booking approved successfully!",
    });
    refetch();
  };

  return (
    <main className="my-16 min-h-[60vh]">
      <div className="container mx-auto">
        <Title title1="Pending" title2="Bookings" />

        {isLoading ? (
          <div className="w-full mih-h-96 grid place-content-center">
            <Loader />
          </div>
        ) : (
          <Table>
            <TableCaption>A list of the services you booked.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-">Client Name</TableHead>
                <TableHead className="w-">Service Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-nowrap">Phone</TableHead>
                <TableHead className="text-center">Event Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myBookings &&
                myBookings.map((booking) => (
                  <TableRow key={booking._id.toString()}>
                    <TableCell className="font-medium">
                      {booking.service_consumer.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {booking.service.service_name}
                    </TableCell>
                    <TableCell>{booking.event_location}</TableCell>
                    <TableCell>{booking.phone_number}</TableCell>
                    <TableCell className="text-center">
                      {formatDate(booking.event_date)}
                    </TableCell>
                    <TableCell className="text-center">
                      {booking.status ? (
                        booking.status === "pending" ? (
                          <span className="text-[#F5A623]">Pending</span>
                        ) : (
                          <span className="text-[#4CAF50]">Approved</span>
                        )
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="text-center flex justify-center items-center gap-3">
                      {booking.status === "pending" && (
                        <Button
                          variant={"destructive"}
                          onClick={() => handleApprove(booking?._id.toString())}
                        >
                          Approve
                        </Button>
                      )}
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
