"use client";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";

export const ReservationList = ({ bookings }) => {
  const [optimisticBooking, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => bookingId !== booking.id);
    }, //this will take the current state and something that will let us track the state like a id

    // [currentBookings, ...newBookings],// this is for adding new data optimistically // no need to filter
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId); // this will pretend to delete it so it look more responsive while try to delete in the back end
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

//useOptimistic take 2 options the initial state and the update function ,the update will be shown if there is a async process running//optimisticBooking is the state that will return when there is no async action and the begining state //optimisticDelete is a setter function //if there is an error it will revert back to the original state
