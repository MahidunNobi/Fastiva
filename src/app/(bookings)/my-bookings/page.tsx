"use client";
import Loader from "@/components/Shared/Loader/Loader";
import Title from "@/components/Shared/Title/Title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/lib/formateDate";
import { IBooking } from "@/types/BookingType";
import { IService } from "@/types/ServiceTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ObjectId } from "mongoose";

const Page = () => {
  const { data: myBookings, isLoading } = useQuery<
    IBooking<ObjectId, IService>[]
  >({
    queryKey: ["get-my-bookings"],
    queryFn: async () => {
      const res = await axios.get("/my-bookings/api");
      return res.data;
    },
  });

  return (
    <main className="my-16 min-h-[60vh]">
      <div className="container mx-auto">
        <Title title1="My" title2="Bookings" />

        {isLoading ? (
          <div className="w-full mih-h-96 grid place-content-center">
            <Loader />
          </div>
        ) : (
          <Table>
            <TableCaption>A list of the services you booked.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-">Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-nowrap">Phone</TableHead>
                <TableHead className="text-center">Event Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myBookings &&
                myBookings.map((booking) => (
                  <TableRow key={booking._id.toString()}>
                    <TableCell className="font-medium">
                      {booking.service.service_name}
                    </TableCell>
                    <TableCell>{booking.event_location}</TableCell>
                    <TableCell>{booking.service.service_price}</TableCell>
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
