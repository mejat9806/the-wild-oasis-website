"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservationContext } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some(
      (date) => isWithinInterval(date, { start: range.from, end: range.to }), //this will check if the given date is within the range
    )
  );
}

function DateSelector({ settings, cabin, bookedDate }) {
  const { range, setRange, resetRange } = useReservationContext();
  // CHANGE
  // const [range, setRange] = useState({ from: undefined, to: undefined });
  const displayRange = isAlreadyBooked(range, bookedDate) ? {} : range; //this mean is the bookdate is within the  range return empty object else return the original range

  const { regular_price, discount } = cabin;
  const { minBookingLength, maxBookingLength } = settings;
  // const range = { from: null, to: null };
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = regular_price * numNights - discount;
  // SETTINGS

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        mode="range"
        onSelect={setRange}
        className="pt-12 place-self-center"
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDate.some((date) => isSameDay(date, currDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regular_price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_price}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
