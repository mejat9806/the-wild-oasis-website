"use client";
import { useFormStatus } from "react-dom";

export const FormButton = () => {
  const { status, pending, data } = useFormStatus();
  //the useFormStatus need to be render by the form
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {!pending ? "Update profile" : "Updating..."}
    </button>
  );
};
