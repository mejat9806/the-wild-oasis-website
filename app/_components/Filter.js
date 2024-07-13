"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Filter = () => {
  const searchParams = useSearchParams(); //this is for client components to get the search params
  const router = useRouter();
  const pathname = usePathname();
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    //URLSearchParams(searchParams) becomes we want to have like a default search params

    params.set("capacity", filter); //tthis is the way to create a search params
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); //this router id from next js route it allow us to move around like navigate from react router
  }

  const activeSearchParams = searchParams.get("capacity") ?? "all"; //this just to get the serach params and the defult is all
  console.log(activeSearchParams);
  // all of this to create a search params
  return (
    <div className="border border-primary-800 flex">
      <Button
        filter={"all"}
        activeSearchParams={activeSearchParams}
        handleFilter={handleFilter}
      >
        All Cabins
      </Button>
      <Button
        filter={"small"}
        activeSearchParams={activeSearchParams}
        handleFilter={handleFilter}
      >
        Small
      </Button>
      <Button
        filter={"medium"}
        activeSearchParams={activeSearchParams}
        handleFilter={handleFilter}
      >
        Medium
      </Button>
      <Button
        filter={"large"}
        activeSearchParams={activeSearchParams}
        handleFilter={handleFilter}
      >
        Large
      </Button>
    </div>
  );
};

function Button({ children, filter, activeSearchParams, handleFilter }) {
  console.log(children, "children");
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeSearchParams === filter ? "bg-primary-700" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
