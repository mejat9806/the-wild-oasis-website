import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { ReservationProvider } from "./ReservationContext";

export const Reservation = async ({ cabin }) => {
  const setting = await getSettings();
  const bookedDate = await getBookedDatesByCabinId(cabin.id);
  return (
    <div className="grid grid-cols-2 gap-4 border-primary-800 min-h-[400px]">
      <DateSelector settings={setting} cabin={cabin} bookedDate={bookedDate} />
      <ReservationForm bookedDate={bookedDate} cabin={cabin} />
    </div>
  );
};

//this commponnet is a server component that wrap around 2 client components .
//it also fetch the data and send it to the client as a prop because if we do at the top of the page it will make the main page need to wait for this component to finish fetching the data
//to prevent this we wrap it in suspense as a streamer so the main page can render first
