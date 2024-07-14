import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import { Filter } from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";
// export const revalidate = 0; // this is used to diable cache
export const revalidate = 3600; // this is ISR //this is no longer working is we have searchParams because searchParams required dynamically generated page

export const metadata = {
  title: "Cabins",
};

const Page = ({ searchParams }) => {
  //this is how to access the search params  only available in page for server components // if searchParams changing it will render the page because server components re render when it have navigation

  const filter = searchParams?.capacity ?? "all";
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
      <div className="flex justify-end mb-8">
        <Filter />
        {/* this is rendering a client component in server component example */}
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        {/* key work the same like like map function it give special identitfication for each suspense */}
        {/* suspense will trigger the fallback to sinner while data fetching in the children component */}
        <ReservationReminder />

        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
};

export default Page;
