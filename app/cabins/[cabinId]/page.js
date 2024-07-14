import { Cabin } from "@/app/_components/Cabin";
import { Reservation } from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import {
  getBookedDatesByCabinId,
  getCabin,
  getCabins,
  getSettings,
} from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

// export const metadata ={
//     title :""
// }

export const generateMetadata = async ({ params }) => {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
};
export const generateStaticParams = async () => {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id), //this is need to be the same as the dynamic route name the [cabinId] folder
  }));
  return ids;

  //this is use to create a static params to make our page not dynamic and become static .only when we have pre determined amount of dynamic route like here 8 .if can change better use dynamic generate route
};
export default async function Page({ params }) {
  // const setting = await getSettings();
  // const bookedDate = await await getBookedDatesByCabinId();
  // // to get params from url it work like props in next js no need to use react router .the name of the params is the name of the [] folder name
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          {/* wraping suppense arround slow component allow us to use stream on the slow part .it allow us to view dont fetching page first without having to wait for slow component  */}
          <Reservation cabin={cabin} />
        </Suspense>
        {/* create thing new servercompont to prevent fetch waterfall from happening */}
      </div>
    </div>
  );
}

// const [cabin, setting, bookedDate] = await Promise.all([
//   getCabin(params.cabinId),
//   getBookedDatesByCabinId(params.cabinId),
//   getSettings(),
// ]); //promiseAll will make the promise go in parrelel but not a great idea here
// const { id, name, maxCapacity, regular_price, discount, image, description } =
//   cabin;
