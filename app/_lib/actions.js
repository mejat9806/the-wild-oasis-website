"use server";

import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  getCabinPrice,
  updateBooking,
} from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}
export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateProfile(formdata) {
  const session = await auth();
  console.log(session);
  if (!session) throw new error("You must be login");

  const nationalID = formdata.get("nationalID");
  const nationalInfo = formdata.get("nationality");
  const [nationality, countryFlag] = nationalInfo.split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error(" please enter valid national id ");
  }
  const updateData = { nationalID, countryFlag, nationality };
  console.log(updateData);
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  await new Promise((res) => setTimeout(res, 2000));
  const session = await auth();
  if (!session) {
    throw new Error("you must be login");
  }
  const Bookings = await getBookings(session.user.guestId);

  const userBooking = Bookings.map((booking) => booking.id);

  const isCorrectUser = userBooking.includes(bookingId);
  console.log(isCorrectUser, "isCorrectUser");

  if (!isCorrectUser) {
    throw new Error("not your reservations");
  }
  await deleteBooking(bookingId);

  // ;

  revalidatePath("/account/reservations");
}

export async function updateReservation(formdata) {
  const bookingID = formdata.get("bookingId");

  const numGuests = formdata.get("numGuests");
  const observations = formdata.get("observations");
  const session = await auth();
  const Bookings = await getBookings(session.user.guestId);
  const currentBooking = await getBooking(bookingID);
  const { regular_price } = await getCabinPrice(currentBooking.cabinID);
  const updatePrice = regular_price * numGuests;
  const totalPrice = updatePrice;
  const updatedFields = { numGuests, observations, totalPrice };
  const userBooking = Bookings.map((booking) => booking.id);
  const isCorrectUser = userBooking.includes(Number(bookingID));
  if (!isCorrectUser) {
    throw new Error("Not your reservations");
  }
  await updateBooking(bookingID, updatedFields);
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/${bookingID}`);
  redirect("/account/reservations");
}

export async function createNewBooking(bookingData, formData) {
  // FormData {
  //   cabinPrice: '3375',
  //   numNights: '9',
  //   endDate: 'Thu Aug 22 2024 00:00:00 GMT+0800 (Singapore Standard Time)',
  //   startDate: 'Tue Aug 13 2024 00:00:00 GMT+0800 (Singapore Standard Time)',
  //   numGuests: '2',
  //   observations: 'aasdasd'
  // }
  const session = await auth();
  if (!session) {
    throw new Error("Not log in ");
  }
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000) || "";
  console.log(numGuests, observations);

  const guestID = session.user.guestId;
  const newBooking = {
    ...bookingData,
    numGuests,
    observations,
    extrasPrice: 0,
    guestID,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  if (isNaN(newBooking.cabinPrice)) {
    console.log("error cabin price is NaN");
    throw new Error("Please select date");
  }
  console.log(newBooking.numNights, "Please select data");

  console.log(newBooking);

  await createBooking(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinID}`);
  redirect("/cabins/thankyou");
}
