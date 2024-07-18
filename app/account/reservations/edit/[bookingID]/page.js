import { UpdateReservationForm } from "@/app/_components/UpdateReservationForm";
import { updateReservation } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getBookings, getCabin } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  // CHANGE
  const bookingData = await getBooking(params.bookingID);
  const session = await auth();
  const data = await getBookings(session.user.guestId);
  const cabinData = await getCabin(bookingData.cabinID);
  const reservationId = bookingData.id;

  const currentUserBooking = data.map((booking) => booking.id);
  if (!currentUserBooking.includes(bookingData.id)) {
    redirect("/account/reservations");
  }
  console.log(currentUserBooking, "all over booking");
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>
      <UpdateReservationForm
        params={params}
        numGuest={bookingData.numGuests}
        observations={bookingData.observations}
        maxCapacity={cabinData.maxCapacity}
      />
    </div>
  );
}
