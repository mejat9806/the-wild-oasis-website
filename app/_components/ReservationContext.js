"use client";
import { createContext, useContext, useState } from "react";

export const ReservationContext = createContext({});

const initialState = { from: undefined, to: undefined };
const ReservationProvider = ({ children }) => {
  const [range, setRange] = useState(initialState);

  const resetRange = () => {
    setRange({ from: undefined, to: undefined });
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("use in reservation context only");
  }
  return context;
};

export { useReservationContext, ReservationProvider };
