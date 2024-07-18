"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import { deleteReservation } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  // function deleteReservation() {
  //   "use server";
  // } // this is for server actions in server components
  function handleDeleteReservation() {
    if (confirm("Are you sure you want to delete")) {
      startTransition(() => onDelete(bookingId));
    }
  }
  //wrap the server actions in a start transition to make it as a transition to add like laoding indicator//white the function in the start transition doing its work the isPending becomes true so we can use it to show loading progress
  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      onClick={handleDeleteReservation}
    >
      {isPending ? (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
}

export default DeleteReservation;
