import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedCabins] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    console.log(cabin);
    return Response.json({ cabin, bookedCabins });
  } catch (error) {
    return Response.json("cabin not found");
  }
}
export async function POST() {}

//this is use to create api route for other person to  THE data without supabase stuff
