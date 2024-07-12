// export default function Page() {
//   return <div>hello</div>;
// }

import Counter from "@/app/_components/counter";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
// export const revalidate = 0; // this is used to diable cache
export const revalidate = 3600; // this is ISR

export const metadata = {
  title: "Cabins",
};

const Page = () => {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature &apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense fallback={<Spinner />}>
        {/* suspense will trigger the fallback to sinner while data fetching in the children component */}
        <CabinList />
      </Suspense>
    </div>
  );
};

export default Page;
