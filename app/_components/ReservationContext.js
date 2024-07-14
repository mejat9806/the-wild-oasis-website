"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext({});

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

const useRervationContext = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("use in reservation context only");
  }
  return context;
};

export { useRervationContext, ReservationProvider };
